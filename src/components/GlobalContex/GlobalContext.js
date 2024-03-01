import { createContext, useState } from "react";
import LS2Request from "@enact/webos/LS2Request";
import axios from "axios";

const initVal = {
  route: "",
  dataList: [],
  page: 0,
};

const authInit = {
  username: "",
  password: "",
  device: "",
};

const authHC = {
  username: "stani_mi@yahoo.com",
  password: "sTanislav73!",
  device: "b28b1e1a68db30b2f37e33f08db4d72e",
};

export const GlobalContext = createContext({
  handleRouteUrl: () => {},
  devInfo: () => {},
  getAuthData: () => {},
  setAuthData: () => {},
  initVal,
  authInit,
});

const GlobalState = ({ children }) => {
  const [voyoState, setvoyoState] = useState(initVal);
  const [auth, setAuth] = useState(authInit);
  const [device, setDevice] = useState(false);

  const getAuthData = () => {
    if (device) {
      new LS2Request().send({
        service: "luna://com.voyo.bg.service",
        method: "auth",
        parameters: {
          action: "get",
        },
        onSuccess: (res) => {
          console.log("auth - get - data", res);
          setAuth(res.data);
        },
      });
    } else {
      console.log("auth - get HC - data");
      setAuth(authHC);
    }
  };
  const setAuthData = (new_auth) => {
    if (device) {
      new LS2Request().send({
        service: "luna://com.voyo.bg.service",
        method: "auth",
        parameters: {
          action: "set",
          data: new_auth,
        },
        onSuccess: (res) => {
          console.log("auth - set - data", res);
          setAuth(new_auth);
        },
      });
    } else {
      setAuth(new_auth);
    }
  };

  const processData = (data, page, route_url) => {
    console.log("processData", data);
    if (data) {
      if (page === 0 || (page < 2 && route_url !== voyoState.route)) {
        const voyo = {
          route: route_url,
          dataList: data,
          page: page,
        };
        console.log(voyo);
        setvoyoState(voyo);
      } else {
        let voyo = {
          route: route_url,
          dataList: voyoState.dataList,
          page: page,
        };
        if (page > voyoState.dataList.items.length / 24) {
          for (let idx = 0; idx < data.items.length; ++idx) {
            voyo.dataList.items.push(data.items[idx]);
          }
        }
        console.log(voyo);
        setvoyoState(voyo);
      }
    }
  };

  const handleRouteUrl = (route_url, page) => {
    if (auth.username === "") {
      getAuthData();
    }
    console.log(route_url, page);
    const route_des = {
      home: "overview",
      TV: "tv",
      films: "content/filter?category=20344&sort=date-desc&page=",
      series: "content/filter?category=20345&sort=date-desc&page=",
      shows: "content/filter?category=20346&page=",
      kids: "content/filter?category=20411&page=",
      concerts: "content/filter?category=20404&page=",
      sport: "content/filter?category=20378&page=",
      "live sport": "content/filter?category=20408",
      search: "search?query=<search string>&orderBy=default&page=",
    };

    let dest = null;
    if (route_url === "" || route_url === "settings") {
      const voyo = {
        route: route_url,
        dataList: null,
        page: 0,
      };
      setvoyoState(voyo);
      return;
    }
    dest = route_des[route_url];
    const real_url = `https://napi.voyo.bg`;
    const path = `/api/bg/v1/`;
    let pg = "";
    if (page > 0) {
      pg = pg + page;
    }
    if (device) {
      const url = `${real_url}${path}${dest}${pg}`;
      new LS2Request().send({
        service: "luna://com.voyo.bg.service",
        method: "url_get",
        parameters: {
          url: url,
        },
        onSuccess: (res) => {
          console.log("getUrl - data");
          processData(res.data, page, route_url);
        },
      });
    } else {
      const url = `http://localhost:5000`;
      console.log(`${url}${path}${dest}${pg}`);
      axios.get(`${url}${path}${dest}${pg}`).then((res) => {
        console.log("asios getdata");
        processData(res.data, page, route_url);
      });
    }
  };

  const devInfo = (info) => {
    console.log(info);
    if (info.modelName === "webOS Device") {
      setDevice(false);
    } else {
      setDevice(true);
    }
    getAuthData();
  };

  const contextValue = {
    handleRouteUrl,
    devInfo,
    getAuthData,
    setAuthData,
    voyoState,
    auth,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

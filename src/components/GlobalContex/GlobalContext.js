import { createContext, useState } from "react";
import LS2Request from "@enact/webos/LS2Request";

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
  getAuth: () => {},
  initVal,
  authInit,
});

const GlobalState = ({ children }) => {
  const [voyoState, setvoyoState] = useState(initVal);
  const [auth, setauthState] = useState(authInit);

  const [device, setdeviceState] = useState(false);

  const devInfo = (info) => {
    console.log(info);
    if (info.modelName === "webOS Device") {
      setdeviceState(false);
    } else {
      setdeviceState(true);
    }
  };

  const getAuth = () => {
    if (device) {
      new LS2Request().send({
        service: "luna://com.voyo.bg.service",
        method: "auth",
        parameters: {
          auth: "get",
        },
        onSuccess: (res) => {
          console.log("auth - get - data");
          setauthState(res.auth);
        },
      });
    } else {
      setauthState(authHC);
    }
  };

  const processData = (data, page, route_url) => {
    console.log("handleRouteUrl", data);
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

  const handleRouteUrl = async (route_url, page) => {
    const opts = {
      mode: "cors",
    };
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
      const responce = await fetch(`${url}${path}${dest}${pg}`, opts);
      const data = await responce.json();
      processData(data, page, route_url);
    }
  };
  const contextValue = {
    handleRouteUrl,
    devInfo,
    getAuth,
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

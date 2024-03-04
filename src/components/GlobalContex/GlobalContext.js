import { createContext, useState } from "react";
import LS2Request from "@enact/webos/LS2Request";
import deviceinfo from "@enact/webos/deviceinfo";
import axios from "axios";

const initVal = {
  "": {
    route: "",
    dataList: [],
    page: 0,
  },
};

const route_initval = "home";

const authInit = {
  username: "",
  password: "",
  device: "",
};

const authHC = {
  username: "stani_mi@yahoo.com",
  password: "sTanislav73!",
  //  device: "b28b1e1a68db30b2f37e33f08db4d72e",
};

export const GlobalContext = createContext({
  handleRouteUrl: () => {},
  getDeviceInfo: () => {},
  getAuthData: () => {},
  setAuthData: () => {},
  initVal,
  authInit,
  route_initval,
  device : false,
  credentials : null,
});

const GlobalState = ({ children }) => {
  const [voyo_map, setVoyo_map] = useState(initVal);
  const [groute, setRoute] = useState("home");
  const [auth, setAuth] = useState(authHC);
  const [device, setDevice] = useState(false);
  const [credentials, setCredentials] = useState(null)

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
      if (
        page === 0 ||
        (page < 2 && Object.keys(voyo_map).indexOf(route_url) < 0)
      ) {
        const voyo = {
          route: route_url,
          dataList: data,
          page: page,
        };
        voyo_map[route_url] = voyo;
        setVoyo_map(voyo_map);
        setRoute(route_url);

        console.log(voyo_map);
      } else {
        let voyo = voyo_map[route_url];
        voyo.page = page;
        voyo.route = route_url;
        if (page > voyo.dataList.items.length / 24) {
          for (let idx = 0; idx < data.items.length; ++idx) {
            voyo.dataList.items.push(data.items[idx]);
          }
        }
        voyo_map[route_url] = voyo;
        setVoyo_map(voyo_map);
        setRoute(route_url);
        console.log(voyo_map);
      }
    }
  };
  const processPostResp = (data, route_url) => {
    console.log("process post Resp", route_url, data);
    if (data) {
      console.log(data);
      if (Object.keys(data).indexOf("credentials") >= 0) {
        setCredentials(data["credentials"]);
        console.log(credentials);
      }
    }
  };
  const handleRouteUrl = (route_url, page) => {
    const product_id = "";
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
      info: "users/info",
      login: "login",
      link: `products/${product_id}/plays?acceptVideo=drm-widevine`,
    };

    let dest = null;
    if (route_url === "" || route_url === "settings") {
      return;
    }
    dest = route_des[route_url];
    const real_url = `https://napi.voyo.bg`;
    const path = `/api/bg/v1/`;
    let pg = "";
    if (page > 0) {
      pg = pg + page;
    }
    let method = "url_get";
    if (route_url === "login" || route_url === "login") {
      method = "url_post";
    }
    if (device) {
      const url = `${real_url}${path}${dest}${pg}`;
      new LS2Request().send({
        service: "luna://com.voyo.bg.service",
        method: method,
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
      console.log(method, route_url, `${url}${path}${dest}${pg}`);
      if (method === "url_get") {
        if (route_url === "info") {
          if (credentials) {
            const headers = {
              Authorization:
                credentials["accessType"] +
                " " +
                credentials["accessToken"],
            };
            console.log('get', `${url}${path}${dest}${pg}`,{ headers: headers });
            axios
              .get(`${url}${path}${dest}${pg}`, { headers: headers })
              .then((res) => {
                console.log("asios info", res.data);
                //processData(res.data, page, route_url);
              });
          } else {
            console.log("cred:", credentials);
          }
        } else {
          axios.get(`${url}${path}${dest}${pg}`).then((res) => {
            console.log("asios getdata");
            processData(res.data, page, route_url);
          });
        }
      } else {
        if (credentials) {
          const headers = {
            Authorization:
            credentials["accessType"] + " " + credentials["accessToken"],
          };
          axios
            .post(`${url}${path}${dest}${pg}`, auth, { headers: headers })
            .then((res) => {
              console.log("asios postdata");
              processPostResp(res.data, route_url);
            });
        } else {
          axios.post(`${url}${path}${dest}${pg}`, auth).then((res) => {
            console.log("asios postdata");
            processPostResp(res.data, route_url);
          });
        }
      }
    }
  };

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
          handleRouteUrl("login", 0);
        },
      });
    } else {
      console.log("auth - get HC - data");
      setAuth(authHC);
      handleRouteUrl("login", 0);
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

  const getDeviceInfo = () => {
    deviceinfo(devInfo);
    console.log("getDeviceInfo");
    getAuthData();
  };

  const contextValue = {
    handleRouteUrl,
    getDeviceInfo,
    getAuthData,
    setAuthData,
    voyo_map,
    auth,
    groute,
    device,
    credentials,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

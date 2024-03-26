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
  device: false,
  credentials: null,
});

const GlobalState = ({ children }) => {
  const [voyo_map, setVoyo_map] = useState(initVal);
  const [groute, setRoute] = useState("home");
  const [auth, setAuth] = useState(authHC);
  const [device, setDevice] = useState(false);
  const [credentials, setCredentials] = useState(null);

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
      if (route_url === "login") {
        if (Object.keys(data).indexOf("credentials") >= 0) {
          setCredentials(data["credentials"]);
          console.log(credentials);
        }
      } else {
        if (route_url === "link") {
          if (Object.keys(data).indexOf("url") >= 0) {
            const voyo = {
              route: route_url,
              title: data["content"]["title"],
              source: data["url"],
              type: "application/x-mpegURL",
              desc: data["content"]["description"],
              poster: data["content"]["image"].replace(
                "{WIDTH}x{HEIGHT}",
                "284x410"
              ),
            };
            voyo_map["play"] = voyo;
            setVoyo_map(voyo_map);
            setRoute("play");
            console.log(voyo_map);
          }
        }
      }
    }
  };

  const sendUrlReq = (url_req, method, headers, data, page, route_url) => {
    console.log(url_req, method, headers, data, page, route_url);
    if (device) {
      new LS2Request().send({
        service: "luna://com.voyo.bg.service",
        method: "url",
        parameters: {
          url: url_req,
          method: method,
          headers: headers,
          data: data,
        },
        onSuccess: (res) => {
          console.log(method, res.data);
          if (method === "url_get") {
            return processData(res.data, page, route_url);
          } else {
            return processPostResp(res.data, route_url);
          }
        },
        onFailure: (res) => {
          console.log("failure:", method, url_req, res);
        },
      });
    } else {
      if (method === "url_get") {
        axios.get(url_req, { headers: headers }).then((res) => {
          console.log(method, url_req, res.data);
          return processData(res.data, page, route_url);
        });
      } else {
        axios.post(url_req, data, { headers: headers }).then((res) => {
          console.log(method, url_req, res.data);
          return processPostResp(res.data, route_url);
        });
      }
    }
  };

  const handleRouteUrl = (route_url, page, product_id = 0) => {
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
    if (route_url === "login" || route_url === "link") {
      method = "url_post";
    }
    let url = `http://localhost:5000`;
    if (device) {
      url = real_url;
    }
    const url_req = `${url}${path}${dest}${pg}`;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "application/json, text/plain, */*",
    };
    if (route_url === "link" || route_url === "info") {
      headers = {
        Authorization:
          credentials["accessType"] + " " + credentials["accessToken"],
      };
    }
    let data = null;
    if (route_url === "login") {
      data = auth;
    }
    return sendUrlReq(url_req, method, headers, data, page, route_url);
  };

  const getAuthData = () => {
    if (false) {
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

  const devInfo = (info) => {
    console.log(info);
    if (info.modelName === "webOS Device") {
      setDevice(false);
    } else {
      setDevice(true);
    }
    //setAuth(authHC);
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

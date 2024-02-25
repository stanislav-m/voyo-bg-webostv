import { createContext, useState } from "react";
import LS2Request from '@enact/webos/LS2Request';

const initVal = {
  route: "",
  dataList: [],
  page: 0,
};

export const GlobalContext = createContext({
  handleRouteUrl: () => { },
  initVal,
});

const GlobalState = ({ children }) => {
  const [voyoState, setvoyoState] = useState(initVal);

  const getUrl = async (url) => {
    // to cancel a request you must store a reference
    console.log("getUrl", url);
    const req = new LS2Request().send({
      service: 'luna://com.voyo.bg.service',
      method: 'url_get',
      parameters: {
        url: url
      },
      onSuccess: (res) => {
        console.log(res.data);
        return res.data;
      }
    });
  }

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
      search: "search?query=<search string>&orderBy=default&page="
    };

    let dest = null;
    if (route_url === "" || route_url === "test") {
      const voyo = {
        route: route_url,
        dataList: null,
        page: 0,
      };
      setvoyoState(voyo);
      return;
    }
    dest = route_des[route_url];
    const real_url = `https://napi.voyo.bg`
    const path = `/api/bg/v1/`;
    let pg = "";
    if (page > 0) {
      pg = pg + page;
    }
    const data = await getUrl(`${real_url}${path}${dest}${pg}`);
    //const url = `http://localhost:5000`;
    //const responce = await fetch(`${url}${path}${dest}${pg}`, opts);
    //const data = await responce.json();
    if (data) {
      if ((page === 0) || ((page < 2) && (route_url !== voyoState.route))) {
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
  const contextValue = {
    handleRouteUrl,
    voyoState,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

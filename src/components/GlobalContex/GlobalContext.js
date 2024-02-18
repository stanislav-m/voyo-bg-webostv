import { createContext, useState } from "react";

const initVal = {
  route: "",
  dataList: [],
  page: 0
};

export const GlobalContext = createContext({
  handleRouteUrl: () => { },
  initVal,
});

const GlobalState = ({ children }) => {
  const [voyoState, setvoyoState] = useState(initVal);

  const handleRouteUrl = async (route_url, page) => {
    const opts = {
      mode: "cors",
    };
    console.log(route_url, page);
    const route_des = {
      "overview": "overview",
      "TV": "tv",
      "films": "content/filter?category=20344&sort=date-desc&page=",
      "series": "content/filter?category=20345&sort=date-desc&page=",
      "shows": "content/filter?category=20346&page=",
      "kids": "content/filter?category=20411&page=",
      "concerts": "content/filter?category=20404&page=",
      "sport": "content/filter?category=20378&page=",
    }
    //"sport": "content/filter?category=20408",

    let dest = null;
    if (route_url === "") {
      const voyo = {
        route: route_url,
        dataList: null,
        page: 0
      }
      setvoyoState(voyo);
      return;
    }
    dest = route_des[route_url];
    const url = `http://localhost:5000`;
    const path = `/api/bg/v1/`;
    let pg = "";
    if (page > 0) {
      pg = pg + page;
    }
    const responce = await fetch(`${url}${path}${dest}${pg}`, opts);
    const data = await responce.json();
    if (data) {
      if ((page < 2) && (route_url !== voyoState.route)) {
        const voyo = {
          route: route_url,
          dataList: data,
          page: page
        }
        console.log(voyo);
        setvoyoState(voyo);
      } else {
        let voyo = {
          route: route_url,
          dataList: voyoState.dataList,
          page: page
        }
        if (page > (voyoState.dataList.items.length / 24)) {
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
    voyoState
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

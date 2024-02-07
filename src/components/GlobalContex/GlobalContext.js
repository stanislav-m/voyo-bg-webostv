import { createContext, useState } from "react";

const initVal = {
  route: "",
  dataList: []
};

export const GlobalContext = createContext({
  handleRouteUrl: () => { },
  initVal,
});

const GlobalState = ({ children }) => {
  const [voyoState, setvoyoState] = useState(initVal);

  const handleRouteUrl = async (route_url) => {
    const opts = {
      mode: "cors",
    };

    const route_des = {
      "overview": "overview",
      "TV": "tv",
      "films": "content/filter?category=20344",
      "series": "content/filter?category=20345",
      "shows": "content/filter?category=20346",
      "kids": "content/filter?category=20411",
      "concerts": "content/filter?category=20404",
    }

    let dest = null;
    if (route_url === "" || route_url === "test") {
      const voyo = {
        route: route_url,
        dataList: null,
      }
      setvoyoState(voyo);
      return;
    }
    dest = route_des[route_url];
    const url = `http://localhost:5000`;
    const path = `/api/bg/v1/`;
    const responce = await fetch(`${url}${path}${dest}`, opts);
    const data = await responce.json();
    if (data) {
      const voyo = {
        route: route_url,
        dataList: data,
      }
      setvoyoState(voyo);
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

import { createContext, useState } from "react";

export const GlobalContext = createContext({
  route: "",
  handleRouteUrl: () => {},
  dataList: [],
});

const GlobalState = ({ children }) => {
  const [route, setRoute] = useState("");
  const [dataList, setDataList] = useState([]);

  const handleRouteUrl = async (route_url) => {
    const opts = {
      mode: "cors",
    };
    console.log(route_url);

    const route_des = {
      "overview":"overview",
      "TV" : "tv",
      "films": "content/filter?category=20344",
      "series":"content/filter?category=20345",
      "more":"content/filter?category=20346",
      "kids":"content/filter?category=20411",
      "concenrts":"content/filter?category=20404",
    }

    let dest = null;
    if (route_url === "") {
      console.log("setroute empty");
      return;
    }
    dest = route_des[route_url];
    const url = `http://localhost:5000`;
    const path = `/api/bg/v1/`;
    const responce = await fetch(`${url}${path}${dest}`, opts);
    const data = await responce.json();
    if (data) {
      console.log("set data", route_url);
      setDataList(data);
    }
    setRoute(route_url);
    console.log("set route", route_url);
  };
  const contextValue = {
    route,
    handleRouteUrl,
    dataList,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

import { createContext, useState } from "react";

export const GlobalContext = createContext({
  route: "",
  handleRouteUrl: () => {},
  overviewList: [],
  loading: false,
});

const GlobalState = ({ children }) => {
  const [route, setRoute] = useState("");
  const [loading, setLoading] = useState(false);
  const [overviewList, setOverviewList] = useState([]);

  const handleRouteUrl = async (route_url) => {
    console.log("handleRouteUrl:" + route_url);
    setLoading(true);
    const opts = {
      mode: "cors",
    };

    console.log(route_url);
    let dest = null;
    //const url = `https://napi.voyo.bg`;
    if (route_url === "overview") {
      dest = "overview";
    } else {
      if (route_url === "") {
        console.log("setroute empty");
        return;
      }
    }
    const url = `http://localhost:5000`;
    const path = `/api/bg/v1/`;
    const responce = await fetch(`${url}${path}${dest}`, opts);
    const data = await responce.json();
    if (data) {
      console.log(data);
      setLoading(false);
      if (route_url === "overview") {
        setOverviewList(data);
      }
    }
    setRoute(route_url);
  };
  const contextValue = {
    route,
    handleRouteUrl,
    overviewList,
    loading,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

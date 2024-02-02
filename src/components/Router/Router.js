import { useEffect, useContext } from 'react';
import { GlobalContext } from "../GlobalContex/GlobalContext";
import OverviewList from "../../views/OverviewList";

const Router = () => {
    const {route, handleRouteUrl } = useContext(GlobalContext);

    useEffect(() => {
      console.log("router setup");
      handleRouteUrl("overview");
      return () => {
        console.log("router cleanup");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    console.log(route);

    return (
        <div>
        { route === "overview" && <OverviewList />  }
        </div>
    );
};

export default Router;
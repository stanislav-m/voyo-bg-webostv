import { useEffect, useContext } from 'react';
import { GlobalContext } from "../GlobalContex/GlobalContext";
import OverviewList from "../../views/OverviewList";
import TVList from "../../views/TVList";
import CategList from '../../views/CategList';

const Router = () => {
  const { route, handleRouteUrl } = useContext(GlobalContext);

  console.log(route);

  useEffect(() => {
    handleRouteUrl("TV");
    //handleRouteUrl("films");
    //handleRouteUrl("kids");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {route === "overview" && <OverviewList />}
      {route === "TV" && <TVList />}
      {["films", "series", "more", "kids", "concenrts"].indexOf(route) > -1 && <CategList />}
    </div>
  );
};

export default Router;
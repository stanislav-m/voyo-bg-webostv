import { useContext } from 'react';
import { GlobalContext } from "../GlobalContex/GlobalContext";
import OverviewList from "../../views/OverviewList";
import TVList from "../../views/TVList";
import CategList from '../../views/CategList';
import Test_l from '../../views/Test_l';

const Router = () => {
  const { voyoState} = useContext(GlobalContext);

  return (
    <div>
      {voyoState.route === "overview" && <OverviewList />}
      {voyoState.route === "TV" && <TVList />}
      {["films", "series", "shows", "kids", "concenrts"].indexOf(voyoState.route) > -1 && <CategList />}
      {voyoState.route === "test" && <Test_l />}
    </div>
  );
};

export default Router;
import { useContext } from 'react';
import { GlobalContext } from "../GlobalContex/GlobalContext";
import OverviewList from "../../views/OverviewList";
import TVList from "../../views/TVList";
import CategList from '../../views/CategList';
import Settings from '../../views/Settings'

import css from './Router.module.less';

const Router = () => {
  const { voyoState, auth} = useContext(GlobalContext);
  console.log("router:" , voyoState.route);
  return (
    <div className={css.content}>
      {voyoState.route === "home" && auth.username === "" && <Settings />}
      {voyoState.route === "home" && auth.username !== "" && <OverviewList />}
      {voyoState.route === "TV" && <TVList />}
      {["films", "series", "shows", "kids", "concerts", "sport", "live sport"].indexOf(voyoState.route) > -1 && <CategList />}
      {voyoState.route === "settings" && <Settings />}
    </div>
  );
};

export default Router;
import { useContext } from 'react';
import { GlobalContext } from "../GlobalContex/GlobalContext";
import OverviewList from "../../views/OverviewList";
import TVList from "../../views/TVList";
import CategList from '../../views/CategList';

import css from './Router.module.less';

const Router = () => {
  const { voyoState} = useContext(GlobalContext);

  return (
    <div className={css.content}>
      {voyoState.route === "overview" && <OverviewList />}
      {voyoState.route === "TV" && <TVList />}
      {["films", "series", "shows", "kids", "concerts", "sport", "live sport"].indexOf(voyoState.route) > -1 && <CategList />}
    </div>
  );
};

export default Router;
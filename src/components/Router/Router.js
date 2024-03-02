import OverviewList from "../../views/OverviewList";
import TVList from "../../views/TVList";
import CategList from '../../views/CategList';
import Settings from '../../views/Settings'

import css from './Router.module.less';

const Router = ({voyoState, handleRouteUrl}) => {
  console.log("router:", voyoState);

  const RouteFunction = (route) => {
    switch (route) {
      case "home":
        return <OverviewList data={voyoState} handle={handleRouteUrl} />;
      case "TV":
        return <TVList data={voyoState} handle={handleRouteUrl} />;
      case "settings":
        return <Settings data={voyoState} handle={handleRouteUrl} />
      default:
        if (["films", "series", "shows", "kids", "concerts", "sport", "live sport"].indexOf(voyoState.route) > -1) {
          return <CategList data={voyoState} handle={handleRouteUrl} />
        }
    }
  }

  return (
    <div className={css.content}>
      {RouteFunction(voyoState.route)}
    </div>
  );
};

export default Router;
import OverviewList from "../../views/OverviewList";
import TVList from "../../views/TVList";
import CategList from '../../views/CategList';
import Settings from '../../views/Settings'
import Loading from '../../views/Loading';
import Player from '../../views/Player';

import css from './Router.module.less';

const Router = ({name, voyoState, handleRouteUrl}) => {
  console.log("router:", name, voyoState);

  const RouteFunction = (route) => {
    console.log(route, voyoState);

    if (route !== "settings" && voyoState === undefined) {
      return <Loading />
    }
    switch (route) {
      case "play":
        {
        let drmcfg= "";
        if (voyoState['drm'] != undefined) {
          const ks = voyoState['drm']['keySystem'];
          const lu = voyoState['drm']['licenseUrl'];
          const voyo_serv = {
            'com.widevine.alpha': lu,
          };
         drmcfg = { drm: { servers: voyo_serv } };
         console.log(drmcfg, voyoState["source"]);
        }
        return <Player title={voyoState["title"]}  source={voyoState["source"]} config={drmcfg} desc={voyoState["desc"]} poster={voyoState["poster"]} handle={handleRouteUrl}/>;
      }
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
      {RouteFunction(name)}
    </div>
  );
};

export default Router;
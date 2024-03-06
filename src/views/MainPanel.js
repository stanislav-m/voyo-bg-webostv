import { useCallback, useContext, useMemo, useEffect, useState } from "react";
import { Panel } from "@enact/sandstone/Panels";
import { TabLayout, Tab } from "@enact/sandstone/TabLayout";
import { GlobalContext } from "../components/GlobalContex";
import Router from "../components/Router";

const MainPanel = (props) => {
  const { groute, voyo_map, handleRouteUrl, getDeviceInfo } =
    useContext(GlobalContext);

  const [route, setRoute] = useState("home");

  console.log("main panel", voyo_map);
  useEffect(
    () => {
      getDeviceInfo();
    }, // eslint-disable-next-line
    []
  );

  const tab_names = useMemo(() => {
    const _tab_names = [
      { id: 0, name: "home", icon: "home", page: 0 },
      { id: 1, name: "TV", icon: "speakercenter", page: 0 },
      { id: 2, name: "kids", icon: "googlephotos", page: 1 },
      { id: 3, name: "shows", icon: "r2rappcall", page: 1 },
      { id: 4, name: "series", icon: "bookmark", page: 1 },
      { id: 5, name: "films", icon: "recording", page: 1 },
      { id: 6, name: "sport", icon: "soccer", page: 1 },
      { id: 7, name: "live sport", icon: "football", page: 0 },
      { id: 8, name: "concerts", icon: "music", page: 1 },
      { id: 9, name: "settings", icon: "gear", page: 0 },
    ];
    return _tab_names;
  }, []);

  const tabSelected = useCallback(
    ({ index }) => {
      handleRouteUrl(tab_names[index].name, tab_names[index].page);
      setRoute(tab_names[index].name);
      console.log("tab select", tab_names[index].name);
    },
    [handleRouteUrl, tab_names]
  );
  //{...rest} className={className + " " + css.app}>
  return (
    <div>
      <Panel {...props}>
        <TabLayout onSelect={tabSelected} orientation="vertical">
          {tab_names.map((item) => (
            <Tab title={item.name} icon={item.icon} key={item.id}>
              <Router
                name={groute}
                voyoState={voyo_map[groute]}
                handleRouteUrl={handleRouteUrl}
              />
            </Tab>
          ))}
        </TabLayout>
      </Panel>
    </div>
  );
};

export default MainPanel;

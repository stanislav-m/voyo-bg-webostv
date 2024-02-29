import { useCallback, useContext, useMemo, useEffect } from "react";
import { Panel } from '@enact/sandstone/Panels';
import { TabLayout, Tab } from '@enact/sandstone/TabLayout';
import { GlobalContext } from "../components/GlobalContex";
import Router from '../components/Router';
import deviceinfo from '@enact/webos/deviceinfo';

const MainPanel = (props) => {
	const { handleRouteUrl, devInfo, getAuth} = useContext(GlobalContext);

	useEffect(() => {
		handleRouteUrl("overview", 0);
		deviceinfo(devInfo);
		getAuth();
	},
		// eslint-disable-next-line
		[])
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

	const tabSelected = useCallback(({ index }) => {
		handleRouteUrl(tab_names[index].name, tab_names[index].page);
	}, [handleRouteUrl, tab_names]);

	return (
		<Panel {...props}>
			{/*<Header noCloseButton title="Voyo" />*/}
			<TabLayout
				onSelect={tabSelected}
				orientation="vertical"
			>
				{
					tab_names.map((item) => (
						<Tab title={item.name} icon={item.icon} key={item.id}>
							<Router />
						</Tab>
					))
				}
			</TabLayout>
		</Panel>
	)
}

export default MainPanel;

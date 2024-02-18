import { useCallback, useContext, useMemo, useEffect } from "react";
import { Panel, Header } from '@enact/sandstone/Panels';
import { TabLayout, Tab } from '@enact/sandstone/TabLayout';
import { GlobalContext } from "../components/GlobalContex";
import Router from '../components/Router';

const MainPanel = (props) => {
	const { handleRouteUrl } = useContext(GlobalContext);

	useEffect(() => {
		handleRouteUrl("TV", 0);
	},
		// eslint-disable-next-line
		[])
	const tab_names = useMemo(() => {
		const _tab_names = [
			{ id: 0, name: "TV", icon: "speakercenter", page: 0 },
			{ id: 1, name: "kids", icon: "googlephotos", page: 1 },
			{ id: 2, name: "shows", icon: "r2rappcall", page: 1 },
			{ id: 3, name: "series", icon: "bookmark", page: 1 },
			{ id: 4, name: "films", icon: "recording", page: 1 },
			{ id: 5, name: "sport", icon: "soccer", page: 1 },
			{ id: 6, name: "concerts", icon: "music", page: 1 },
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

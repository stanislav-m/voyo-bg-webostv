import { useCallback, useContext, useMemo, useEffect } from "react";
import { Panel, Header } from '@enact/sandstone/Panels';
import { TabLayout, Tab } from '@enact/sandstone/TabLayout';
import { GlobalContext } from "../components/GlobalContex";
import Router from '../components/Router';

const MainPanel = (props) => {
	const { handleRouteUrl } = useContext(GlobalContext);

	useEffect(() => {
		handleRouteUrl("TV");
	},
		// eslint-disable-next-line
		[])
	const tab_names = useMemo(() => {
		const _tab_names = [
			{ id: 0, name: "TV", icon: "speakercenter" },
			{ id: 1, name: "kids", icon: "googlephotos" },
			{ id: 2, name: "shows", icon: "r2rappcall" },
			{ id: 3, name: "series", icon: "bookmark" },
			{ id: 4, name: "films", icon: "recording" },
			{ id: 5, name: "test", icon: "guide" },
		];
		return _tab_names;
	}, []);

	const tabSelected = useCallback(({ index }) => {
		handleRouteUrl(tab_names[index].name);
	}, [handleRouteUrl, tab_names]);

	return (
		<Panel {...props}>
			<Header noCloseButton title="Voyo" />
			<TabLayout
				onSelect={tabSelected}
				//onTabAnimationEnd={function noRefCheck() { }}
				orientation="vertical"
				tabSize={20}
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

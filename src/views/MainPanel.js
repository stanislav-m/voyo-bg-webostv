import { useCallback, useContext } from "react";
import { Panel, Header } from '@enact/sandstone/Panels';
import { TabLayout, Tab } from '@enact/sandstone/TabLayout';
import { GlobalContext } from "../components/GlobalContex";
import Router from '../components/Router';

const MainPanel = (props) => {
	const { handleRouteUrl } = useContext(GlobalContext);

	const tab_names = [
		{ id: 0, name: "TV" },
		{ id: 1, name: "kids" },
		{ id: 2, name: "more" },
		{ id: 3, name: "series" },
		{ id: 4, name: "films" },
	];

	const tabSelected = useCallback(({ index }) => {
		console.log(index, tab_names[index].name);
		handleRouteUrl(tab_names[index].name);
	}, []);

	return (
		<Panel {...props}>
			<Header noCloseButton subtitle="content" title="Voyo" />
			<TabLayout
				onSelect={tabSelected}
				onTabAnimationEnd={function noRefCheck() { }}
				orientation="vertical"
				tabSize={null}
			>
				{
					tab_names.map((item) => (
						<Tab title={item.name} key={item.id}>
							<Router />
						</Tab>
					))
				}
			</TabLayout>
		</Panel>
	)
}

export default MainPanel;

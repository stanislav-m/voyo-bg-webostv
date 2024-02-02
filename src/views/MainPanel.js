import kind from '@enact/core/kind';
import {Panel} from '@enact/sandstone/Panels';
import Router from '../components/Router';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Router/>
		</Panel>
	)
});

export default MainPanel;

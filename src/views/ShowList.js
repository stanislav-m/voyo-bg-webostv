import { VirtualGridList } from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import { useCallback, useContext } from 'react';
import { GlobalContext } from "../components/GlobalContex/GlobalContext";

import ShowItem from './ShowItem';

const ShowList = ({ imageitems, total, ...rest }) => {
	const { voyoState, handleRouteUrl } = useContext(GlobalContext);
	console.log(voyoState.route, imageitems.length, total);

	const renderItem = useCallback(({ ...props }) => {
		const { id, title, image, type, url } = imageitems[props.index];
		return (
			<ShowItem {...props}
				id={id}
				title={title}
				image={image}
				type={type}
				url={url}
			/>)
	}
		, [imageitems]);

	const ScrollStop = useCallback(({moreInfo}) => {
		const { lastVisibleIndex } = moreInfo;
		console.log(lastVisibleIndex, imageitems.length, total);
		if ( (lastVisibleIndex === imageitems.length - 1) && (imageitems.length < total)) {
			handleRouteUrl(voyoState.route, imageitems.length/24 + 1);
		}
	}, [imageitems.length, handleRouteUrl, voyoState.route, total]);

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{ minHeight: ri.scale(410*2), minWidth: ri.scale(284*2) }}
			onScrollStop={ScrollStop}
		/>
	);
};

ShowList.propTypes = {
	dispatch: PropTypes.func,
	imageitems: PropTypes.array,
};

export default ShowList;

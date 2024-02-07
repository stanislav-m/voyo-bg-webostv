import { VirtualGridList } from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import ShowItem from './ShowItem';

const ShowList = ({ imageitems, ...rest }) => {
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

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: ri.scale(570), minWidth: ri.scale(688)}}
		/>
	);
};

ShowList.propTypes = {
	dispatch: PropTypes.func,
	imageitems: PropTypes.array,
};

export default ShowList;

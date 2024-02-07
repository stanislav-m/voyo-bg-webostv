import { VirtualGridList } from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import TestItem from './TestItem';

const TestList = ({ imageitems, ...rest }) => {
	const renderItem = useCallback(({ ...props }) => {
		const { id, name, cap } = imageitems[props.index];
		return (
			<TestItem {...props}
				id={id}
				name={name}
				cap={cap}
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

TestList.propTypes = {
	dispatch: PropTypes.func,
	imageitems: PropTypes.array,
};

export default TestList;


import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import TvItem from './Tvtem';

const TvsList = ({imageitems, ...rest}) => {
	const renderItem = useCallback(({...props}) =>  {
        const {name, logo, currentlyPlaying, nextShow} = imageitems[props.index];
        let curTitle = null;
        {
            const {title} = currentlyPlaying;
            curTitle = title
        }
        let nextitle = null;
        {
            const {title} = nextShow;
            nextitle = title;
        }
        return  (<TvItem {...props} name={name} logo={logo} current={curTitle} next={nextitle} />) }
    , [imageitems]);

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: ri.scale(326*2), minWidth: ri.scale(344*2)}}
            hoverToScroll
		/>
	);
};

TvsList.propTypes = {
	dispatch: PropTypes.func,
	imageitems: PropTypes.array
};

export default TvsList;

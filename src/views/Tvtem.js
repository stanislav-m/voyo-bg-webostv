import kind from '@enact/core/kind';
import ImageItem from '@enact/sandstone/ImageItem';
import PropTypes from 'prop-types';

const GalleryTvItem = kind({
	name: 'TvItem',

	propTypes: {
        id: PropTypes.number,
        logo: PropTypes.string,
        logoTransparent: PropTypes.string,
        name: PropTypes.string,
		selected: PropTypes.bool,
		selectImageItem: PropTypes.func,
		selectionOverlayShowing: PropTypes.bool,
	},

	render: ({logo, name, current, next, selected, selectImageItem, selectionOverlayShowing, ...rest}) => {
		delete rest.index;
		return (
			<ImageItem
				{...rest}
				label={name}
				onClick={selectImageItem}
				selected={selected}
				showSelection={selectionOverlayShowing}
				src={logo}
				style={{padding: '18px'}}
			>
			{current} следва:{next}
			</ImageItem>
		);
	}
});

export default GalleryTvItem;

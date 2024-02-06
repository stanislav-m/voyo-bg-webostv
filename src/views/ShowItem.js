import kind from '@enact/core/kind';
import ImageItem from '@enact/sandstone/ImageItem';
import PropTypes from 'prop-types';

const GalleryShowItem = kind({
	name: 'ShowItem',

	propTypes: {
        id: PropTypes.string,
        image: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
		selected: PropTypes.bool,
		selectImageItem: PropTypes.func,
		selectionOverlayShowing: PropTypes.bool,
	},

	render: ({image, title, selected, selectImageItem, selectionOverlayShowing, ...rest}) => {
		delete rest.index;
		return (
			<ImageItem
				{...rest}
				label={title}
				onClick={selectImageItem}
				selected={selected}
				showSelection={selectionOverlayShowing}
				src={image.replace("{WIDTH}x{HEIGHT}", "284x410")}
				style={{padding: '18px'}}
			>
			{title}
			</ImageItem>
		);
	}
});

export default GalleryShowItem;

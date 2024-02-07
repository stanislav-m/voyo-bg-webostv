import kind from '@enact/core/kind';
import ImageItem from '@enact/sandstone/ImageItem';
import PropTypes from 'prop-types';

const GalleryTestItem = kind({
	name: 'Testtem',

	propTypes: {
        cap: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
		selected: PropTypes.bool,
		selectImageItem: PropTypes.func,
		selectionOverlayShowing: PropTypes.bool,
	},

	render: ({name, cap, selected, selectImageItem, selectionOverlayShowing, ...rest}) => {
        console.log(name, cap, selected, selectImageItem, selectionOverlayShowing, rest);
		delete rest.index;
		return (
			<ImageItem
				{...rest}
				label={cap}
				onClick={selectImageItem}
				selected={selected}
				showSelection={selectionOverlayShowing}
				src="https://img.voyo.bweb.bg/media/images/284x410/Jan2024/61358365.jpg"
				style={{padding: '18px'}}
			>
			{name}
			</ImageItem>
		);
	}
});

export default GalleryTestItem;

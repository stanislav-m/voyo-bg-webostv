import { VirtualGridList } from "@enact/sandstone/VirtualList";
import ri from "@enact/ui/resolution";
import PropTypes from "prop-types";
import { useCallback, useState, useRef, useEffect } from "react";
import ShowItem from "./ShowItem";

const ShowList = ({ route, handle, imageitems, total, ...rest }) => {
  const [selectedindex, setselectedindex] = useState(0);
  console.log(route, imageitems.length, total, imageitems);

  const renderItem = useCallback(
    ({ ...props }) => {
      const { id, title, image, type, url } = imageitems[props.index];
      return (
        <ShowItem
          {...props}
          handle={handle}
          id={id}
          title={title}
          image={image}
          type={type}
          url={url}
        />
      );
    },
    [imageitems, handle]
  );

  const ScrollStop = useCallback(
    ({ moreInfo }) => {
      const { lastVisibleIndex } = moreInfo;
      console.log(lastVisibleIndex, imageitems.length, total, imageitems);
      if (lastVisibleIndex === imageitems.length - 1 &&
          imageitems.length < total) {
            setselectedindex(lastVisibleIndex);
            handle(route, imageitems.length / 24 + 1);
      }
    },
    [total, route, handle, imageitems]
  );

  const scrollToRef = useRef(null);

  useEffect(() => {
    scrollToRef.current({ index: selectedindex, animate: false, focus: true });
  }, [selectedindex]);

  useEffect(() => {
    // Below is an example of using scrollTo method for setting an "initial" position of VirtualList.
    // It is a substitute for focusOnIndex, setInitialFocusIndex, and scrollToItem of enyo.
    scrollToRef.current({ index: 0, animate: false, focus: true });
  }, []);

  const getScrollTo = useCallback((scrollTo) => {
    scrollToRef.current = scrollTo;
  }, []);

  delete rest.dispatch;

  return (
    <VirtualGridList
      {...rest}
      dataSize={imageitems.length}
      itemRenderer={renderItem}
      itemSize={{ minHeight: ri.scale(410 * 2), minWidth: ri.scale(284 * 2) }}
      onScrollStop={ScrollStop}
      cbScrollTo={getScrollTo}
      hoverToScroll
    />
  );
};

ShowList.propTypes = {
  dispatch: PropTypes.func,
  imageitems: PropTypes.array,
};

export default ShowList;

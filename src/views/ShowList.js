import { VirtualGridList } from "@enact/sandstone/VirtualList";
import ri from "@enact/ui/resolution";
import PropTypes from "prop-types";
import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../components/GlobalContex/GlobalContext";

import ShowItem from "./ShowItem";

const ShowList = ({ imageitems, total, ...rest }) => {
  const { voyoState, handleRouteUrl } = useContext(GlobalContext);
  const [selectedindex, setselectedindex] = useState(0);
  console.log(voyoState.route, imageitems.length, total);

  const renderItem = useCallback(
    ({ ...props }) => {
      const { id, title, image, type, url } = imageitems[props.index];
      return (
        <ShowItem
          {...props}
          id={id}
          title={title}
          image={image}
          type={type}
          url={url}
        />
      );
    },
    [imageitems]
  );

  const ScrollStop = useCallback(
    ({ moreInfo }) => {
      const { lastVisibleIndex } = moreInfo;
      console.log(lastVisibleIndex, imageitems.length, total);
      if (lastVisibleIndex === imageitems.length - 1 &&
          imageitems.length < total) {
        setselectedindex(lastVisibleIndex);
        handleRouteUrl(voyoState.route, imageitems.length / 24 + 1);
      }
    },
    [imageitems.length, total, voyoState.route, handleRouteUrl]
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

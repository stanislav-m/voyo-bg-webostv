import { VirtualGridList } from "@enact/sandstone/VirtualList";
import ri from "@enact/ui/resolution";
import { useCallback } from "react";

import TvItem from "./Tvtem";

const TvsList = ({ route, handle, imageitems, ...rest }) => {
  console.log(route, imageitems.length, imageitems);

  const renderItem = useCallback(
    ({ ...props }) => {
      const { id, name, logo, currentlyPlaying, nextShow } =
        imageitems[props.index];
      return (
        <TvItem
          {...props}
          handle={handle}
          id={id}
          name={name}
          logo={logo}
          current={currentlyPlaying['title']}
          next={nextShow['title']}
        />
      );
    },
    [imageitems, handle]
  );

  delete rest.dispatch;

  return (
    <VirtualGridList
      {...rest}
      dataSize={imageitems.length}
      itemRenderer={renderItem}
      itemSize={{ minHeight: ri.scale(326 * 2), minWidth: ri.scale(344 * 2) }}
      hoverToScroll
    />
  );
};

export default TvsList;

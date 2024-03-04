import { useCallback } from "react";
import ImageItem from "@enact/sandstone/ImageItem";

const TvItem = ({
  logo,
  name,
  current,
  next,
  handle,
  ...rest
}) => {

  const selectImageItem = useCallback((index) => {
    console.log("clicked on: ", index);
    handle("login", 0);
  }, [handle]);

  const info = current + ' следва: ' + next;
  return (
    <ImageItem
      {...rest}
      label={name}
      onClick={selectImageItem}
      src={logo}
      style={{ padding: "18px" }}
    >
      {info}
    </ImageItem>
  );
};

export default TvItem;

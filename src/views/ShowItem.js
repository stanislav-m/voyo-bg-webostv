import { useCallback } from "react";
import ImageItem from "@enact/sandstone/ImageItem";

const ShowItem = ({ image, title, handle, ...rest }) => {
  const selectImageItem = useCallback((index) => {
    console.log("clicked on: ", index);
    handle("info", 0);
  }, [handle]);

  return (
    <ImageItem
      {...rest}
      label={title}
      onClick={selectImageItem}
      src={image.replace("{WIDTH}x{HEIGHT}", "284x410")}
      style={{ padding: "18px" }}
    >
      {title}
    </ImageItem>
  );
};
export default ShowItem;

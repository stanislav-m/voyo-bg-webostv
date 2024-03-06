import { useCallback } from "react";
import ImageItem from "@enact/sandstone/ImageItem";

const ShowItem = ({ id, image, title, handle, type, ...rest }) => {
  const selectImageItem = useCallback(
    (index) => {
      console.log("clicked on: ", index);
      if (type === "movie") {
        handle("link", 0, id);
      }
    },
    [handle, id, type]
  );

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

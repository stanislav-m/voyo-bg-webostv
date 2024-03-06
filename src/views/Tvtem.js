import { useCallback } from "react";
import ImageItem from "@enact/sandstone/ImageItem";

const TvItem = ({
  id,
  logo,
  name,
  current,
  next,
  handle,
  ...rest
}) => {

  const handleClick = useCallback(() => {
    console.log(id, name, logo);
    handle("link", 0, id);
    } , [handle, id, logo, name]);

  const info = current + ' следва: ' + next;
  return (
    <ImageItem
      {...rest}
      label={name}
     onClick={handleClick}
      src={logo}
      style={{ padding: "18px" }}
    >
      {info}
    </ImageItem>
  );
};

export default TvItem;

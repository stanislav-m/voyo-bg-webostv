import { useRef, useEffect, useCallback, useState } from "react";
//import VideoPlayer from "@enact/sandstone/VideoPlayer";
//import { MediaControls } from "@enact/sandstone/MediaPlayer";
import LS2Request from "@enact/webos/LS2Request";
import Hls from "hls.js";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

const Player = ({ title, source, config, desc, poster, handle }) => {
  const videoRef = useRef(null);

  const handleOnBack = useCallback(() => {
    handle("TV", 0);
  }, [handle]); 

  return (
    <VideoPlayer
      ref={videoRef}
      title={title}
      poster={poster}
      src={source}
      config={config}
      autoPlay
      width="100%"
      height="100%"
    >
    </VideoPlayer>
  );
};

export default Player;

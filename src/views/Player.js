import { useRef, useEffect, useCallback } from "react";
import VideoPlayer from "@enact/sandstone/VideoPlayer";
import { MediaControls } from "@enact/sandstone/MediaPlayer";
import Button from "@enact/ui/Button";
import Hls from "hls.js";

const Player = ({ title, source, type, desc, poster, handle }) => {
  const hlsRef = useRef(null);
  const videoRef = useRef(null);

  const getHls = () => {
    if (hlsRef.current === null) {
      hlsRef.current = new Hls();
    }
    return hlsRef.current;
  };

  const handlePlayerButtonHome = useCallback( () => {
    handle("TV", 0);
  }, [handle]);

  useEffect(() => {
    const hls = getHls();
    if (type === "application/x-mpegURL") {
      hls.loadSource(source);
      hls.attachMedia(videoRef.current.getVideoNode().media);
    } else {
      hls.detachMedia();
      const video = videoRef.current.getVideoNode().media;
      video.src = source;
    }
  }, [source, type]);

  return (
    <VideoPlayer ref={videoRef} title={title} poster={poster}>
      <source src={source} type={type} />
      <MediaControls>
        <Button
          icon="home"
          onClick={handlePlayerButtonHome}
        />
      </MediaControls>      
    </VideoPlayer>
  );
};

export default Player;
/*
    <VideoPlayer ref={videoRef} title={title} poster={poster}>
      <source src={source} type={type} />
      <infoComponents>{desc}</infoComponents>
      <MediaControls>
        <Button
          icon="home"
          onClick={handlePlayerButtonHome}
        />
      </MediaControls>
    </VideoPlayer>

*/
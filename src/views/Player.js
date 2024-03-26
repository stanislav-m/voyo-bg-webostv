import { useRef, useEffect, useCallback } from "react";
import VideoPlayer from "@enact/sandstone/VideoPlayer";
//import { MediaControls } from "@enact/sandstone/MediaPlayer";
import Hls from "hls.js";

const Player = ({ title, source, type, desc, poster, handle }) => {
  const videoRef = useRef(null);

  const handleOnBack = useCallback(() => {
    handle("TV", 0);
  }, [handle]); 

  const hlsRef = useRef(null);
  const getHls = () => {
    if (hlsRef.current === null) {
      hlsRef.current = new Hls();
    }
    return hlsRef.current;
  };

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
    <VideoPlayer
      ref={videoRef}
      title={title}
      poster={poster}
      onBack={handleOnBack}
    >
      <source src={source} type={type} />
      <infoComponents>{desc}</infoComponents>
    </VideoPlayer>
  );
};

export default Player;
/*
    <MediaControls></MediaControls>
        <VirtualGridList
          dataSize={20}
          direction="horizontal"
          horizontalScrollbar="hidden"
          hoverToScroll
          itemRenderer={function noRefCheck(){}}
          itemSize={{
            minHeight: 90,
            minWidth: 106.66666666666666
          }}
          spacing={4}
          style={{
            height: 80,
            marginTop: 20
          }}
        />

        <Button
              icon="home"
              onClick={handlePlayerButtonHome}
              spotlightDisabled={panelsVisible}
            />


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

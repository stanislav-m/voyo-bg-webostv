import { useState, useCallback, useRef, useEffect } from "react";
import VideoPlayer from "@enact/sandstone/VideoPlayer";
//import {MediaControls} from "@enact/sandstone/MediaPlayer";
import Hls from "hls.js";

const Player = ({ title, source, type, desc, poster }) => {
  const hlsRef = useRef(null);
  const videoRef = useRef(null);

  //const source = 'https://vd3.bweb.bg/live/NOXVUW8rB7qNAVJHmlkc3w/1709709143/61065646.m3u8';
  //const type = 'application/x-mpegURL';

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
    <VideoPlayer ref={videoRef} title={title} poster={poster}>
      <source src={source} type={type} />
      <infoComponents>{desc}</infoComponents>
    </VideoPlayer>
  );
};

export default Player;

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactHlsPlayer from "react-hls-player/dist";

const VideoPlayer = ({ video }) => {
  const playerRef = useRef();

  useEffect(() => {
    const handleSpaceKeyPress = event => {
      if (!event.code === "Space") {
        return;
      }

      if (playerRef.current.paused) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    };

    window.addEventListener("keypress", handleSpaceKeyPress);

    return () => {
      window.removeEventListener("keypress", handleSpaceKeyPress);
    };
  }, []);

  return (
    <ReactHlsPlayer
      playerRef={playerRef}
      autoPlay={false}
      controls
      width="auto"
      height="77%"
      crossOrigin="true"
      src={video.videoStreamingURL}
    />
  );
};

VideoPlayer.propTypes = {
  video: {
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    gifURL: PropTypes.string.isRequired,
    videoURL: PropTypes.string.isRequired,
    videoStreamingURL: PropTypes.string.isRequired,
  }.isRequired,
};

export default VideoPlayer;

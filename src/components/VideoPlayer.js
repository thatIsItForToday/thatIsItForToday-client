import React from "react";
import PropTypes from "prop-types";
import ReactHlsPlayer from "react-hls-player/dist";

const VideoPlayer = ({ video }) => {
  return (
    <ReactHlsPlayer
      autoPlay={false}
      controls
      width="auto"
      height="77%"
      crossOrigin="true"
      src={video.videoStreamingURL}
    />
  );
};

VideoPlayer.propTypes = {};

export default VideoPlayer;

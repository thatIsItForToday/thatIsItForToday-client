import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player/dist";

import Recorder from "../Recorder";
import {
  getSignedURL,
  getVideoStreamingURL,
  uploadToAWSS3,
} from "../../utils/awsUtils";

const RecorderPage = () => {
  const { user: currentUser } = useSelector(state => state.user);
  const { recorder } = useSelector(state => state.video);
  const [gif, setGif] = useState("");
  const [videoBlob, setVideoBlob] = useState("");
  const [gifBlob, setGifBlob] = useState("");

  const handleSaveRecordedClick = useCallback(async () => {
    try {
      const [videoUploadData, gifUploadData] = await Promise.all([
        getSignedURL(process.env.REACT_APP_GET_PRESIGNED_VIDEO_UPLOAD_URL),
        getSignedURL(process.env.REACT_APP_GET_PRESIGNED_GIF_UPLOAD_URL),
      ]);

      const { uploadURL: videoUploadURL, Key } = videoUploadData;
      const { uploadURL: gifUploadURL } = gifUploadData;
      const videoName = Key.split(".")[0];

      await Promise.all([
        uploadToAWSS3(videoUploadURL, videoBlob, "video/mp4"),
        uploadToAWSS3(gifUploadURL, gifBlob, "image/gif"),
      ]);

      const uploadedURLs = {
        videoURL: videoUploadURL.split("?")[0],
        videoStreamingURL: getVideoStreamingURL(videoName),
        gifURL: gifUploadURL.split("?")[0],
      };

      const result = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/users/${currentUser.id}/video`,
        uploadedURLs
      );
    } catch (error) {
      console.log(error);
    }
  }, [videoBlob, gifBlob]);

  return (
    <Section>
      <Recorder
        setGif={setGif}
        setVideoBlob={setVideoBlob}
        setGifBlob={setGifBlob}
      />
      {recorder?.isRecording && <div>녹화를 마치고 있습니다...</div>}
      {gif && (
        <Container>
          <Gif src={gif} />
          <Button onClick={handleSaveRecordedClick}>저장</Button>
        </Container>
      )}
      <ReactHlsPlayer
        autoPlay={false}
        controls
        width="30%"
        height="auto"
        crossOrigin="true"
        src="https://d210c3znxi5wfh.cloudfront.net/assets/347434/HLS/347434.m3u8"
        // type="application/x-mpegURL"
      />
    </Section>
  );
};

const Section = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 50%;
  height: 100%;
  background-color: black;
  transition: all 0.3s ease-out;
`;

const Gif = styled.img`
  width: 560px;
  height: 420px;
  border-radius: 0.5rem;
  margin: 40px auto;
`;

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 0.5em;
  background-color: black;
  color: white;
  font-family: sans-serif;
  text-align: center;
`;

export default RecorderPage;

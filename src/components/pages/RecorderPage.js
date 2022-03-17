import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import axios from "../../config/axiosInstance";
import { videoActions } from "../../features/videoSlice";
import {
  getSignedURL,
  getThumbnailURL,
  getVideoStreamingURL,
  uploadToAWSS3,
} from "../../utils/awsUtils";
import { getToday } from "../../utils/dateUtils";
import Message from "../Common/Message";
import Recorder from "../Recorder";

const RecorderPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user);
  const { recorder } = useSelector(state => state.video);

  const [gif, setGif] = useState("");
  const [videoBlob, setVideoBlob] = useState("");
  const [gifBlob, setGifBlob] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const handleUploadRecordedClick = useCallback(async () => {
    setIsUploading(true);

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
        gifURL: gifUploadURL.split("?")[0],
        videoURL: videoUploadURL.split("?")[0],
        videoStreamingURL: getVideoStreamingURL(videoName),
        thumbnailURL: getThumbnailURL(videoName),
        runTime: recorder.runTime,
      };

      await axios.post(`/users/${user.id}/video`, uploadedURLs);

      const { data } = await axios.get(`/users/${user.id}/videos`);

      if (data.videos) {
        const { videos } = data;

        dispatch(videoActions.setVideos({ videos }));
      }

      setIsUploading(false);
      setIsUploadSuccess(true);
      dispatch(videoActions.resetRecorder());
    } catch (error) {
      console.log(error);
    }
  }, [videoBlob, gifBlob]);

  const handleReTakeButtonClick = useCallback(() => {
    setGif("");
    setVideoBlob("");
    setGifBlob("");
  }, []);

  return (
    <Section>
      {gif ? (
        <Container className={gif ? "show" : "no-show"}>
          <Text>{`Your memory on ${getToday()}`}</Text>
          <Gif src={gif} />
          <ButtonContainer>
            {isUploading && (
              <Message message="Your memory is being uploaded.." />
            )}
            {!isUploading && !isUploadSuccess && (
              <>
                <Button onClick={handleUploadRecordedClick}>Upload</Button>
                <Button onClick={handleReTakeButtonClick}>Re-take</Button>
              </>
            )}
          </ButtonContainer>
          {isUploadSuccess && <Message message="Uploaded successfully!" />}
        </Container>
      ) : (
        <Recorder
          setGif={setGif}
          setVideoBlob={setVideoBlob}
          setGifBlob={setGifBlob}
        />
      )}
    </Section>
  );
};

const Section = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
  background-color: #73aace;
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 50%;
  height: 100%;
  border-radius: 2em;
  background-color: #bdbdbd;
  opacity: 0;
  transition: all 0.7s ease-out;

  &.show {
    opacity: 1;
    animation: appearGif 0.7s ease-in-out;
  }

  @keyframes appearGif {
    from {
      opacity: 0;
      background-color: black;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      background-color: #bdbdbd;
    }
  }
`;

const Text = styled.h2`
  text-align: center;
  font-family: "ABeeZee";
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
`;

const Gif = styled.img`
  width: 70%;
  height: 55%;
  border-radius: 0.5rem;
  margin: 40px auto;
`;

const ButtonContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-right: ${({ theme }) => theme.spacing.xxxl};
  border-radius: 0.5em;
  background-color: black;
  color: white;
  font-family: "ABeeZee";
  text-align: center;
`;

export default RecorderPage;

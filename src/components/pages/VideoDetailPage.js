import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import styled from "styled-components";

import axios from "../../config/axiosInstance";
import { getRecordedDate } from "../../utils/dateUtils";
import { videoActions } from "../../features/videoSlice";
import thumbnail from "../../images/thumbnail.jpg";
import VideoPlayer from "../VideoPlayer";

const VideoDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.user);
  const { videosByDate, currentVideo } = useSelector(state => state.video);

  const [gifDownloadURL, setGifDownloadURL] = useState(null);
  const [videoDownloadURL, setVideoDownloadURL] = useState(null);

  const date = parseISO(currentVideo.createdAt);

  const handleBackButtonClick = () => {
    navigate("/my-videos");
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(`/users/${user.id}/videos/${currentVideo._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoItemClick = event => {
    const clickedVideo = videosByDate.find(
      video => video._id === event.currentTarget.id
    );
    const payload = { video: clickedVideo };

    dispatch(videoActions.updateCurrentVideo(payload));
  };

  const handleGifDownloadButtonClick = useCallback(() => {
    if (!gifDownloadURL) {
      return;
    }

    const link = document.createElement("a");

    link.href = gifDownloadURL;
    link.setAttribute("download", "image.gif");
    document.body.appendChild(link);
    link.click();
  }, [gifDownloadURL]);

  const handleVideoDownloadButtonClick = useCallback(() => {
    if (!videoDownloadURL) {
      return;
    }

    const link = document.createElement("a");

    link.href = videoDownloadURL;
    link.setAttribute("download", "video.mp4");
    document.body.appendChild(link);
    link.click();
  }, [videoDownloadURL]);

  useEffect(async () => {
    try {
      const [gifResponse, videoResponse] = await Promise.all([
        fetch(currentVideo.gifURL),
        fetch(currentVideo.videoURL),
      ]);

      const [gifBlob, videoBlob] = await Promise.all([
        gifResponse.blob(),
        videoResponse.blob(),
      ]);

      const gifURL = window.URL.createObjectURL(gifBlob);
      const videoURL = window.URL.createObjectURL(videoBlob);

      setGifDownloadURL(gifURL);
      setVideoDownloadURL(videoURL);
    } catch (error) {
      console.log(error);
    }
  }, [currentVideo]);

  return (
    <Section>
      <Container>
        <VideoPlayer video={currentVideo} />
        <Text>{`Memory on ${getRecordedDate(date)}`}</Text>
        <ButtonBox>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={handleDeleteButtonClick}
          >
            Delete
          </Button>
          <Button onClick={handleGifDownloadButtonClick}>Gif Download</Button>
          <Button onClick={handleVideoDownloadButtonClick}>
            Video Download
          </Button>
          <Button onClick={handleBackButtonClick}>Back to Slider</Button>
        </ButtonBox>
      </Container>
      <RightSideContainer>
        {videosByDate.length &&
          videosByDate.map((video, i) => {
            const date = parseISO(video.createdAt);

            return (
              <VideoItemContainer
                key={video._id}
                id={video._id}
                onClick={handleVideoItemClick}
              >
                <ImgBox>
                  <Img src={thumbnail} alt="thumb" />
                </ImgBox>
                <DescriptionBox>
                  <Description>{getRecordedDate(date)}</Description>
                  <Description>{`#${i + 1} memory`}</Description>
                </DescriptionBox>
              </VideoItemContainer>
            );
          })}
      </RightSideContainer>
    </Section>
  );
};

const Section = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
  background-color: #bdbdbd;

  /* background-color: #eeeeee; */
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  align-items: flex-end;
  justify-content: flex-start;
  width: 70%;
  height: 100%;
  padding-left: 8.5%;
  padding-right: 3%;
`;

const RightSideContainer = styled.div`
  ${({ theme }) => theme.container.flexStartColumn};
  width: 28%;
  height: 100%;
  padding: 0 1%;
  overflow-y: auto;
`;

const VideoItemContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  margin-bottom: 2%;
  transition: all 0.01s ease-in-out;

  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const ImgBox = styled.div`
  width: 40%;
  height: 100%;
  background-color: red;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 60%;
  height: 100%;
  padding: 2%;
  font-family: "ABeeZee";
  font-weight: 600;
`;

const Description = styled.p`
  font-family: "ABeeZee";
  font-weight: 600;
`;

const Text = styled.h2`
  margin-top: 2%;
  text-align: center;
  font-family: "ABeeZee";
  font-size: 1.3rem;
  font-weight: 700;
`;

const ButtonBox = styled.div`
  ${({ theme }) => theme.container.flexSpaceBetween};
  width: 50%;
  margin-top: 2%;
`;

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.base};
  margin-top: 2%;
  margin-left: 3%;
  border-radius: 1em;
  background-color: black;
  color: #eeeeee;
  font-family: "ABeeZee";
  font-weight: 500;
  text-align: center;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

export default VideoDetailPage;

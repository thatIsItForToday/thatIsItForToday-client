import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseISO } from "date-fns";
import styled from "styled-components";

import { getRecordedDate } from "../../utils/dateUtils";
import { videoActions } from "../../features/videoSlice";
import thumbnail from "../../images/thumbnail.jpg";
import VideoPlayer from "../VideoPlayer";

const VideoDetailPage = () => {
  const dispatch = useDispatch();

  const { videosByDate, currentVideo } = useSelector(state => state.video);

  const date = parseISO(currentVideo.createdAt);

  const handleVideoItemClick = event => {
    const clickedVideo = videosByDate.find(
      video => video._id === event.currentTarget.id
    );
    const payload = { video: clickedVideo };

    dispatch(videoActions.updateCurrentVideo(payload));
  };

  return (
    <Section>
      <Container>
        <VideoPlayer video={currentVideo} />
        <Text>{`Memory on ${getRecordedDate(date)}`}</Text>
        <Button>Back to Slider</Button>
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

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.base};
  margin-top: 2%;
  border-radius: 1em;
  background-color: black;
  color: #eeeeee;
  font-family: "ABeeZee";
  font-weight: 500;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export default VideoDetailPage;

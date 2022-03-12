import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import axios from "../../config/axiosInstance";
import { videoActions } from "../../features/videoSlice";
import { IMAGE_URL } from "../../config/constants";
import CanvasContainer from "../Three/CanvasContainer";
import Dimension from "../Three/Dimension";
import GifSlider from "../GIfSlider";
import LoadingScreen from "../Common/LoadingScreen";

const MyVideosPage = () => {
  const dispatch = useDispatch();

  const instructionRef = useRef();

  const { user, isLoggedIn } = useSelector(state => state.user);
  const { videosByDate } = useSelector(state => state.video);

  const [isLoadingEnd, setIsLoadingEnd] = useState(false);

  useEffect(() => {
    if (!isLoadingEnd) {
      return;
    }

    instructionRef.current.classList.add("show");

    const timeoutId = setTimeout(() => {
      instructionRef.current.classList.add("no-show");
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoadingEnd]);

  useEffect(async () => {
    if (!isLoggedIn) {
      return;
    }

    const { data } = await axios.get(`/users/${user.id}/videos`);

    if (data.videos) {
      const { videos } = data;

      dispatch(videoActions.setVideos({ videos }));
    }
  }, [isLoggedIn]);

  return (
    <Section>
      <LoadingScreen onEnd={setIsLoadingEnd} />
      <Container>
        {isLoadingEnd && (
          <InstructionBox ref={instructionRef}>
            <Img
              src={IMAGE_URL.MOUSE_SCROLL}
              alt="instruction"
              crossOrigin="true"
            />
            <Text>scroll to find your memory</Text>
          </InstructionBox>
        )}
        <GifContainer>
          <GifSlider videos={videosByDate} />
        </GifContainer>
      </Container>
      <CanvasContainer>
        <Dimension />
      </CanvasContainer>
    </Section>
  );
};

MyVideosPage.propTypes = {};

const Section = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  z-index: 100;
  width: 100vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
  background-color: rgba(255, 255, 255, 0.2);
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.base};
`;

const GifContainer = styled.div`
  ${({ theme }) => theme.container.flexStart};
  width: 100%;
  height: 100%;
  z-index: 1000;
  margin: 1rem;
  overflow: hidden;
`;

const InstructionBox = styled.div`
  position: fixed;
  top: 33%;
  left: 10%;
  z-index: 5002;
  width: 18%;
  height: 40%;
  border-radius: 1rem;
  background-color: white;
  opacity: 0;
  transition: all 0.6s ease-in-out;

  &.show {
    opacity: 0.4;
    animation: appearSrollInstruction 0.6s ease-in-out;
  }

  &.no-show {
    opacity: 0;
    animation: dissappearSrollInstruction 0.6s ease-in-out;
    z-index: -100;
  }

  @keyframes appearSrollInstruction {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.4;
      transform: translateY(0);
    }
  }

  @keyframes dissappearSrollInstruction {
    from {
      opacity: 0.4;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 85%;
`;

const Text = styled.h2`
  margin-top: 2%;
  text-align: center;
  font-family: "ABeeZee";
  font-size: 1.3rem;
  font-weight: 700;
`;

export default MyVideosPage;

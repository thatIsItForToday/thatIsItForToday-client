import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import axios from "../../config/axiosInstance";
import { videoActions } from "../../features/videoSlice";
import { IMAGE_URL } from "../../config/constants";
import CanvasContainer from "../Three/CanvasContainer";
import Dimension from "../Three/Dimension";
import GifSlider from "../GIfSlider";

const MyVideosPage = () => {
  const dispatch = useDispatch();

  // const loadingScreenRef = useRef();
  const instructionRef = useRef();

  const { user, isLoggedIn } = useSelector(state => state.user);
  // const [isLoadingScreenOn, setIsLoadingScreenOn] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoadingScreenOn(false);
  //   }, 1200);
  // }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      instructionRef.current.classList.add("no-show");
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

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
      {/* {isLoadingScreenOn && <LoadingScreen ref={loadingScreenRef} />} */}
      <Container>
        <InstructionBox ref={instructionRef}>
          <Img
            src={IMAGE_URL.MOUSE_SCROLL}
            alt="instruction"
            crossOrigin="true"
          />
          <Text>scroll to moving images</Text>
        </InstructionBox>
        {/* <RowTop> */}
        {/* </RowTop> */}

        <RowBottom>
          <GifSlider />
        </RowBottom>
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

const Title = styled.h1`
  color: white;
  font-family: "ABeeZee";
  font-weight: 700;
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.base};
`;

const RowTop = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100%;
  height: 20%;
  margin: 1rem;
  overflow-x: hidden;
`;

const RowBottom = styled(RowTop)`
  ${({ theme }) => theme.container.flexStart};
  height: 100%;
  z-index: 1000;
  background-color: "green";
  overflow-y: hidden;
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
  opacity: 0.4;
  transition: all 0.3s ease-in-out;

  &.no-show {
    display: none;
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

const LoadingScreen = styled.div`
  position: fixed;
  top: 10vh;
  left: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  background-color: beige;
`;
export default MyVideosPage;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { parseISO } from "date-fns";

import { getRecordedDate } from "../utils/dateUtils";
// import BlackHoleEffect from "./Three/BlackHole/BlackHoleEffect";
import VideoPlayer from "./VideoPlayer";
import Modal from "./Common/Modal";

const VideoModal = () => {
  const navigate = useNavigate();

  const { user } = useSelector(state => state.user);
  const { currentVideo } = useSelector(state => state.video);
  const date = parseISO(currentVideo.createdAt);

  // const [isEffectOn, setIsEffectOn] = useState(true);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setIsEffectOn(false);
  //   }, 2300);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  return (
    <>
      {/* {isEffectOn && <BlackHoleEffect />} */}
      <Modal>
        <Container>
          <Text>{`Record on ${getRecordedDate(date)}`}</Text>
          <VideoPlayer style={{ margin: "5%" }} video={currentVideo} />

          <Button
            onClick={() => {
              navigate(`/my-videos/${user.id}/detail/${currentVideo._id}`);
            }}
          >
            Show on Page
          </Button>
        </Container>
      </Modal>
    </>
  );
};

VideoModal.propTypes = {};

const WhiteSpace = styled.div`
  z-index: 5000;
  width: 100vw;
  height: 100vh;
  background-color: white;

  @keyframes whiteOut {
    from {
      opacity: 1;
      background-color: white;
    }
    to {
      opacity: 0;
      background-color: white;
    }
  }

  animation: whiteOut 0.3s ease-in-out;
`;

const Text = styled.h2`
  margin-bottom: 2%;
  color: #121414;
  text-align: center;
  font-family: "ABeeZee";
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: 3%;
  border-radius: 1em;
  background-color: #121414;
  color: #eeeeee;
  font-family: "ABeeZee";
  font-weight: 500;
  text-align: center;
`;

export default VideoModal;

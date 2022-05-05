import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import styled from "styled-components";

import { selectUser } from "../features/userSlice";
import { selectVideo } from "../features/videoSlice";
import { getRecordedDate } from "../utils/dateUtils";
import VideoPlayer from "./VideoPlayer";
import Modal from "./Common/Modal";

const VideoModal = () => {
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);
  const { currentVideo } = useSelector(selectVideo);

  const date = parseISO(currentVideo.createdAt);

  const handleShowOnPageClick = () => {
    navigate(`/my-videos/${user.id}/detail/${currentVideo._id}`);
  };

  return (
    <Modal>
      <Container>
        <Text>{`Record on ${getRecordedDate(date)}`}</Text>
        <VideoPlayer style={{ margin: "5%" }} video={currentVideo} />
        <Button onClick={handleShowOnPageClick}>Show on Page</Button>
      </Container>
    </Modal>
  );
};

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

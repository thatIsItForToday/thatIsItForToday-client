import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import axios from "../../config/axiosInstance";
import { IMAGE_URL } from "../../config/constants";
import { videoActions } from "../../features/videoSlice";

const MainPage = () => {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector(state => state.user);

  useEffect(async () => {
    if (isLoggedIn) {
      if (!isLoggedIn) {
        return;
      }

      const { data } = await axios.get(`/users/${user.id}/videos`);

      if (data.videos) {
        const { videos } = data;

        dispatch(videoActions.setVideos({ videos }));
      }
    }
  }, [isLoggedIn]);

  return (
    <Section>
      <TextContainer>
        <Paragraph>Start recording your daily lives</Paragraph>
        <Paragraph>and keep them in a special place.</Paragraph>
        <Paragraph>That makes you keep your memory alive.</Paragraph>
      </TextContainer>
      <ImgContainer>
        <MainImg src={IMAGE_URL.MAIN} alt="mainImage" crossOrigin="true" />
      </ImgContainer>
    </Section>
  );
};

const Section = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
  background-color: #eeeeee;
`;

const TextContainer = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  align-items: flex-start;
  width: 50%;
  height: 100%;
  padding-left: 10%;
  font-family: "ABeeZee";
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 700;
  text-align: left;
`;

const ImgContainer = styled.div`
  ${({ theme }) => theme.container.flexStart};
  width: 50%;
  height: 100%;
`;

const MainImg = styled.img`
  width: 75%;
  height: 60%;
  border-radius: 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export default MainPage;

import React from "react";
import styled from "styled-components";

import mainImage from "../../images/main.png";

const MainPage = () => {
  return (
    <Section>
      <TextContainer>
        <Paragraph>Start recording your daily lives</Paragraph>
        <Paragraph>and keep them in a special place.</Paragraph>
        <Paragraph>That makes you keep your memory alive.</Paragraph>
      </TextContainer>
      <ImgContainer>
        <MainImg src={mainImage} alt="mainImage" crossorigin />
      </ImgContainer>
    </Section>
  );
};

const Section = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
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

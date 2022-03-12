import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const LoadingScreen = ({ onEnd }) => {
  const loadingScreenRef = useRef();
  const loadingTextRef = useRef();

  useEffect(() => {
    loadingScreenRef.current.classList.add("loadingStart");

    const timeoutId = setTimeout(() => {
      loadingScreenRef.current.classList.remove("loadingStart");
      loadingScreenRef.current.classList.add("loadingEnd");
      onEnd(true);
    }, 3800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadingTextRef.current.classList.add("typing");
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      loadingTextRef.current.classList.remove("typing");
    };
  }, []);

  return (
    <Screen ref={loadingScreenRef}>
      <TextContainer>
        <LoadingText ref={loadingTextRef}>That is it for today!</LoadingText>
      </TextContainer>
    </Screen>
  );
};

LoadingScreen.propTypes = {};

const Screen = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 10vh;
  left: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  background-color: #222426;
  color: white;
  opacity: 0;
  transition: all 0.6s ease-in-out;

  @keyframes loadingScreenAnimation {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  &.loadingStart {
    animation: loadingScreenAnimation 3.8s ease-in-out;
  }

  &.loadingEnd {
    z-index: -5000;
  }
`;

const TextContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100%;
  height: 100%;
`;

const LoadingText = styled.div`
  ${({ theme }) => theme.container.flexStart}
  width: 100px;
  opacity: 0;
  color: #eeeeee;
  font-family: "ABeeZee";
  font-weight: 700;
  text-align: center;

  &.typing {
    overflow: hidden;
    border-right: 0.1em solid white;
    white-space: nowrap;
    font-size: 1.6rem;
    opacity: 1;
    animation: typing 1.4s steps(20) forwards, blinkCursor 0.8s infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 235px;
    }
  }

  @keyframes blinkCursor {
    from {
      border-color: transparent;
    }
    to {
      border-color: #eeeeee;
    }
  }
`;

export default LoadingScreen;

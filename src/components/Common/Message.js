import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Message = ({ message, isRecording }) => {
  const ref = useRef();

  useEffect(() => {
    const $message = ref.current;

    setTimeout(() => {
      $message.classList.add("show");
    }, 0);

    return () => {
      $message.classList.remove("show");
    };
  }, []);

  return (
    <MessageContainer
      style={{ color: isRecording ? "red" : "black" }}
      id="message"
      ref={ref}
    >
      {message}
    </MessageContainer>
  );
};

Message.defaultProps = {
  isRecording: false,
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  isRecording: PropTypes.bool,
};

const MessageContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: transparent;
  font-family: "ABeeZee";
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  opacity: 0;
  transition: all 0.3s ease-in-out;

  @keyframes appearAnimationText {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.show {
    opacity: 1;
    animation: appearAnimationText 0.3s ease-in-out;
  }
`;

export default Message;

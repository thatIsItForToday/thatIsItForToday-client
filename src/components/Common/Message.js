import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Message = ({ message }) => {
  return <MessageContainer>{message}</MessageContainer>;
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

const MessageContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xxl};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export default Message;

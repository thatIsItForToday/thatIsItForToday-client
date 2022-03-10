import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiX } from "react-icons/hi";
import styled from "styled-components";
import PropTypes from "prop-types";

const Modal = ({ children, id }) => {
  const navigate = useNavigate();

  const handleExitClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (id === -1) {
      navigate(-1);
      return;
    }

    navigate(`/my-travels/${id}`);
  };

  const handleBackClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    navigate(-1);
  };

  useEffect(() => {
    const $modalRoot = document.getElementById("modal-root");
    const $body = document.body;

    $modalRoot.style.position = "relative";
    $body.style.overflow = "hidden";

    return () => {
      $body.style.overflow = "unset";
    };
  }, []);

  return (
    <BackDrop id="modal" onClick={handleExitClick}>
      <ModalWrapper>
        <BackButton onClick={handleBackClick} />
        <ExitButton onClick={handleExitClick} />
        {children}
      </ModalWrapper>
    </BackDrop>
  );
};

export default Modal;

const BackDrop = styled.main`
  ${({ theme }) => theme.container.flexCenter};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalWrapper = styled.section`
  ${({ theme }) => theme.container.flexCenterColumn};
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: hidden;
  width: 60%;
  height: 80%;
  position: relative;
  padding: 3%;
  border-radius: 20px;
  background-color: #eeeeee;
`;

const ExitButton = styled(HiX)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  color: #121414;
  font-size: 30px;
  cursor: pointer;
`;

const BackButton = styled(HiArrowLeft)`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  color: #121414;
  font-size: 30px;
  cursor: pointer;
`;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string || PropTypes.number,
};

Modal.defaultProps = {
  id: -1,
};

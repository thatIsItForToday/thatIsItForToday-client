import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Description = ({ date }) => {
  return (
    <Container>
      <Date>{date}</Date>
    </Container>
  );
};

Description.propTypes = {};

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn}
  width: 100%;
  height: 15%;
`;

const Date = styled.div`
  width: fit-content;
  font-family: "ABeeZee";
  font-weight: 600;
`;

export default Description;

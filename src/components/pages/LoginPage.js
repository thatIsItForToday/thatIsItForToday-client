import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GoogleButton from "react-google-button";
import styled from "styled-components";

import axios from "../../config/axiosInstance";
import signInWithGoogle from "../../config/firebase";
import { IMAGE_URL, RESPONSE } from "../../config/constants";
import {
  getAutoLoginAndUpdate,
  selectUser,
  userActions,
} from "../../features/userSlice";
import Message from "../Common/Message";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const imageRef = useRef();

  const { isLoggedIn } = useSelector(selectUser);

  const [message, setMessage] = useState();

  const handleLoginClick = async () => {
    const userInfo = await signInWithGoogle();

    const { data } = await axios.post("/auth/login", {
      email: userInfo.email,
    });

    if (data.result === RESPONSE.USER_DOES_NOT_EXIST) {
      const { data: signUpResult } = await axios.post("/auth/signup", {
        userInfo,
      });

      if (signUpResult.error) {
        setMessage("에러가 발생했습니다.");
        return;
      }

      if (signUpResult.user) {
        setMessage("회원가입이 완료되었습니다. 로그인을 해주세요. :)");
        return;
      }
    }

    const { user, accessToken, refreshToken } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const { _id: id, email, displayName } = user;
    const currentUser = {
      id,
      email,
      displayName,
    };

    dispatch(userActions.updateUser(currentUser));
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }

    if (!token) {
      return;
    }

    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", token);
    dispatch(getAutoLoginAndUpdate());
    navigate("/");
  });

  return (
    <Section>
      <Container>
        <LoginImg
          ref={imageRef}
          src={IMAGE_URL.LOGIN}
          alt="loginImage"
          crossOrigin="true"
        />
      </Container>
      <Container>
        {message ? <Message message={message} /> : <div />}
        <GoogleButton onClick={handleLoginClick} />
      </Container>
    </Section>
  );
};

const Section = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 50%;
  height: 100%;
`;

const LoginImg = styled.img`
  width: 75%;
  height: 60%;
  border-radius: 1rem;
`;

export default LoginPage;

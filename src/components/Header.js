import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { userActions } from "../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const getAutoLogin = useCallback(async () => {
    const { data } = await axios.get("http://localhost:8000/api/auth/login", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (data.isInvalidToken) {
      return true;
    }

    if (data.user) {
      const { _id: id, email, displayName } = data.user;
      const currentUser = {
        id,
        email,
        displayName,
      };

      dispatch(userActions.updateUser(currentUser));
    }
  }, []);

  const postNewAccessToken = useCallback(async () => {
    const { data } = await axios.post(
      "http://localhost:8000/api/auth/token",
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }
    );

    if (data.accessToken) {
      const newToken = data.accessToken;

      localStorage.setItem("accessToken", newToken);
      getAutoLogin();
    }
  }, []);

  const handleButtonClick = event => {
    const path = event.currentTarget.id;

    navigate(`/${path}`);
  };

  const handleNavButtonClick = event => {
    const path = event.currentTarget.id;

    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate(`/${path}`);
  };

  const handleLogoutButtonClick = async () => {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_API_URL}/auth/logout`,
      {
        email: user.email,
      }
    );

    if (data.result === "ok") {
      dispatch(userActions.deleteUser());

      navigate("/");
    }
  };

  useEffect(async () => {
    if (!user.isLoggedIn) {
      const isAccessTokenExpired = await getAutoLogin();

      if (isAccessTokenExpired) {
        postNewAccessToken();
      }
    }
  }, []);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo onClick={handleButtonClick}>That is it for today</Logo>
      </LogoContainer>
      <ButtonContainer>
        <NavBox>
          <NavButton id="recorder" onClick={handleNavButtonClick}>
            Record Video
          </NavButton>
          <NavButton id="my-videos" onClick={handleNavButtonClick}>
            My Videos
          </NavButton>
        </NavBox>
        <LoginBox>
          {user.isLoggedIn ? (
            <SignButton onClick={handleLogoutButtonClick}>Log out</SignButton>
          ) : (
            <SignButton id="login" onClick={handleButtonClick}>
              Log in
            </SignButton>
          )}
        </LoginBox>
      </ButtonContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  ${({ theme }) => theme.container.flexSpaceBetween};
  width: 100vw;
  height: 10vh;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
`;

const ButtonContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 50%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xxxl};
`;

const LogoContainer = styled(ButtonContainer)`
  justify-content: flex-start;
`;

const NavBox = styled(ButtonContainer)`
  justify-content: flex-end;
  width: 75%;
`;

const LoginBox = styled(ButtonContainer)`
  width: 25%;
`;

const Logo = styled.button`
  ${({ theme }) => theme.container.flexCenter};
  width: fit-content;
  padding: 16px ${({ theme }) => theme.spacing.xxxl};
  margin: ${({ theme }) => theme.spacing.xxl};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.blue};
  font-family: "ABeeZee";
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 700;
`;

const NavButton = styled.button`
  ${({ theme }) => theme.container.flexCenter};
  width: 23%;
  padding: 16px ${({ theme }) => theme.spacing.xxxl};
  margin: ${({ theme }) => theme.spacing.xxl};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
`;

const SignButton = styled(NavButton)`
  width: 60%;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export default Header;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  getAutoLoginAndUpdate,
  putLogoutUser,
  selectUser,
} from "../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector(selectUser);

  const handleButtonClick = event => {
    const path = event.currentTarget.id;

    navigate(`/${path}`);
  };

  const handleLoginButtonClick = () => {
    window.location.href = process.env.REACT_APP_LOGIN_SERVER_RENDERING;
  };

  const handleNavButtonClick = event => {
    if (!isLoggedIn) {
      window.location.href = process.env.REACT_APP_LOGIN_SERVER_RENDERING;
      return;
    }

    const path = event.currentTarget.id;

    navigate(`/${path}`);
  };

  const handleLogoutButtonClick = async () => {
    dispatch(putLogoutUser());

    navigate("/");
  };

  useEffect(async () => {
    if (!isLoggedIn && localStorage.getItem("accessToken")) {
      dispatch(getAutoLoginAndUpdate());
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
          {isLoggedIn ? (
            <SignButton onClick={handleLogoutButtonClick}>Log out</SignButton>
          ) : (
            <SignButton id="login" onClick={handleLoginButtonClick}>
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
  border-bottom: 2px solid #eeeeee;
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
  width: fit-content;
  padding: 16px ${({ theme }) => theme.spacing.xxxl};
  margin: ${({ theme }) => theme.spacing.xxl};
  border-radius: 0.5rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8em;
  font-weight: 600;
`;

const SignButton = styled(NavButton)`
  width: max-content;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export default Header;

import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { FlexDiv } from "../styles/containers";

import NavBar from "./NavBar";

const MainHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 10px 0 10px;
  text-align: center;
  z-index: 10;
  background-color: ${(props) => props.theme.white};
`;

const WrapperFirstPartHeader = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const WrapperButtonHeader = styled(FlexDiv)`
  justify-content: space-evenly;
`;

const DivButtonHeader = styled.div`
  padding: 1rem;
  margin: 0 0.5rem;
`;

const LogoWrapper = styled.h2`
  padding: 0.5rem;
  margin-left: 3rem;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = (props) => {
  return (
    <MainHeader>
      <WrapperFirstPartHeader>
        <LogoWrapper>ChocoWild</LogoWrapper>
        <WrapperButtonHeader>
          <DivButtonHeader>
            <Link to="/sign-in">Connexion</Link>
          </DivButtonHeader>
          <DivButtonHeader>
            <Link to="/order">Panier</Link>
          </DivButtonHeader>
        </WrapperButtonHeader>
      </WrapperFirstPartHeader>
      <NavBar />
    </MainHeader>
  );
};

export default Header;

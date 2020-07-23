import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Burger from "./Burger";

const Nav = styled.nav`
  width: 100%;
  height: 4rem;
  border-top: 2px solid ${(props) => props.theme.grey};
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mediaMax.small`
    border: none;
    width: 0;
    height: 0;
  `};
`;

const NavBar = () => {
  return (
    <>
      <Nav>
        <Burger />
      </Nav>
    </>
  );
};

export default NavBar;

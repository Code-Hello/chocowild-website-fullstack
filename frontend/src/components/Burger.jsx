import React, { useState } from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

const NavUl = styled.ul`
  width: inherit;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;

  ${(props) => props.theme.mediaMax.small`
    flex-flow: column nowrap;
    justify-content: start;
    background-color: ${(props) => props.theme.grey};
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 75%;
    padding-top: 4.5rem;
    transition: transform 0.3s ease-in-out;
  `};
`;

const NavItem = styled.li`
  padding: 18px 10px;

  ${(props) => props.theme.mediaMax.small`
    a {
      color: ${(props) => props.theme.white} !important;
    }
  `};
`;

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 20px;
  right: 20px;
  display: none;
  z-index: 200;

  ${(props) => props.theme.mediaMax.small`
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  `};

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#f8f8f8" : "#3a3835")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <NavUl open={open}>
        <NavItem>
          <Link to="/">Accueil</Link>
        </NavItem>
        <NavItem>
          <Link to="/products">Produits</Link>
        </NavItem>
        <NavItem>
          <Link to="/sign-in">Connexion</Link>
        </NavItem>
        <NavItem>
          <Link to="/admin">(Admin)</Link>
        </NavItem>
      </NavUl>
    </>
  );
};

export default Burger;

import React from "react";

import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;

  color: ${(props) => props.grey && props.theme.grey};
  color: ${(props) => props.coffee && props.theme.coffee};

  background-color: ${(props) => props.greyBg && props.theme.grey};
  background-color: ${(props) => props.coffeeBg && props.theme.coffee};

  &:hover {
    color: ${(props) => props.hoverGreyBg && props.theme.grey};
    color: ${(props) => props.hoverCoffeeBg && props.theme.coffee};
  }
`;

const Button = ({
  children,
  buttonType,
  grey,
  coffee,
  greyBg,
  coffeeBg,
  functionToClick,
  hoverGreyBg,
  hoverCoffeeBg,
}) => {
  return (
    <ButtonStyled
      type={buttonType}
      greyBg={greyBg}
      coffeeBg={coffeeBg}
      grey={grey}
      coffee={coffee}
      hoverGreyBg={hoverGreyBg}
      hoverCoffeeBg={hoverCoffeeBg}
      onClick={functionToClick}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;

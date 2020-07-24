import React from "react";

import styled from "styled-components";
import { TextParagraph } from "../styles/texts";
import { FlexDiv } from "../styles/containers";

const WrapperItemOrder = styled(FlexDiv)`
  width: 80%;
  border: 1px solid black;
  margin: 1rem 0;

  ${(props) => props.theme.mediaMax.small`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `};
`;

const DivImgOrder = styled.div`
  padding: 0.5rem;
`;

const ImgOrder = styled.img`
  width: 15rem;
`;

const OrderItem = (props) => {
  const { name, price, quantity } = props;
  return (
    <>
      <WrapperItemOrder evenly>
        <TextParagraph>{quantity}</TextParagraph>
        <DivImgOrder>
          <ImgOrder src={require("../img/products/brownie.png")} alt="Photo" />
        </DivImgOrder>
        <TextParagraph>{name}</TextParagraph>
        <TextParagraph>{price}</TextParagraph>
      </WrapperItemOrder>
    </>
  );
};

export default OrderItem;

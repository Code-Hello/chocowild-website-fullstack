import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { FlexDiv } from "../styles/containers";
import { H3 } from "../styles/texts";
import OrderItem from "../components/OrderItem";

const TitleOrder = styled(H3)`
  text-align: center;
`;

const ContainerOrderList = styled(FlexDiv)`
  align-items: center;
`;

const DivTot = styled.div`
  width: 50%;
  padding: 1rem;
  text-align: center;
`;

const Order = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const { chosenProducts } = props;

  useEffect(() => {
    const getTotalPrice = () => {
      let priceTemp = 0;
      chosenProducts.map(
        (chosenProduct) => (priceTemp += Number(chosenProduct.priceProduct))
      );
      setTotalPrice(priceTemp);
    };
    getTotalPrice();
  }, [chosenProducts]);

  return (
    <>
      <FlexDiv column>
        <TitleOrder>Panier</TitleOrder>
        <ContainerOrderList column>
          {chosenProducts.map((chosenproduct) => (
            <OrderItem
              key={chosenproduct.idProduct}
              name={chosenproduct.nameProduct}
              price={chosenproduct.priceProduct}
              quantity={chosenproduct.quantity}
            />
          ))}
        </ContainerOrderList>
        <FlexDiv evenly>
          <DivTot>Quantité totale de produits : {chosenProducts.length}</DivTot>
          <DivTot>Prix total : {totalPrice} €</DivTot>
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    chosenProducts: state.chosenProducts,
  };
};

export default connect(mapStateToProps)(Order);

import React from "react";

import { connect } from "react-redux";
import {
  addProductToState,
  deleteProductFromState,
} from "../actions/chosenProductsActions";

import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import { FlexDiv } from "../styles/containers";
import { TextParagraph } from "../styles/texts";
import Button from "./Button";

const ProductWrapper = styled(FlexDiv)`
  align-items: center;
  width: calc(100% / 3);
  margin: 1em;
  background-color: #c4c3c2;
  border-radius: 5px;

  ${(props) => props.theme.mediaMax.small`
    width: 80%;
  `};
`;

const ProductDivImg = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const ProductImg = styled.img`
  border-radius: 10px;
  width: 75%;
  padding: 0.5em;
`;

const ProductDivContent = styled(FlexDiv)`
  margin: 1em 0em;
  text-align: center;
  height: 50%;
`;

const H4 = styled.h4`
  margin: 0.3em;
  font-size: 1.3em;
  text-transform: uppercase;
`;

const Price = styled(TextParagraph)`
  font-weight: bold;
`;

const WrapperButtonProduct = styled.div``;

const ProductItem = (props) => {
  const { id, name, price, image, category } = props;

  const addProduct = () => {
    props.addProductToState(id, name, price, 1);
    toast.success(`Rajouté au panier avec succès !`, {});
  };

  return (
    <>
      <ProductWrapper column>
        <ProductDivImg>
          <ProductImg
            src={require("../img/products/brownie.png")}
            alt="Photo"
          />
        </ProductDivImg>
        <ProductDivContent column evenly>
          <H4>{name}</H4>
          <TextParagraph>{category}</TextParagraph>
          <Price>{price}€</Price>
          <WrapperButtonProduct>
            <Button
              buttonType="submit"
              coffee
              greyBg
              hoverCoffee
              functionToClick={addProduct}
            >
              Ajouter au panier
            </Button>
          </WrapperButtonProduct>
        </ProductDivContent>
      </ProductWrapper>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    chosenProducts: state.chosenProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToState: (idProduct, nameProduct, priceProduct, quantity) =>
      dispatch(
        addProductToState(idProduct, nameProduct, priceProduct, quantity)
      ),
    deleteProductFromState: (idProduct) =>
      dispatch(deleteProductFromState(idProduct)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);

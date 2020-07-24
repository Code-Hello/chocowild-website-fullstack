import React, { useState, useEffect } from "react";
import Axios from "axios";

import { connect } from "react-redux";
import {
  addProductToState,
  deleteProductFromState,
} from "../actions/chosenProductsActions";

import styled from "styled-components";

import { FlexDiv } from "../styles/containers";
import { H3 } from "../styles/texts";
import ProductItem from "../components/ProductItem";

const TitleProducts = styled(H3)`
  text-align: center;
`;

const ContainerProductsList = styled(FlexDiv)`
  flex-flow: wrap;

  ${(props) => props.theme.mediaMax.small`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em 0;
`};
`;

const Products = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await Axios.get(`http://localhost:8000/api/products`, {
          headers: { Accept: "application/json" },
        });
        setAllProducts(data);

        const response = await Axios.get(
          `http://localhost:8000/api/categories`,
          {
            headers: { Accept: "application/json" },
          }
        );
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [allProducts]);

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  if (error) {
    return <div>Error !</div>;
  }

  return (
    <>
      <FlexDiv column>
        <TitleProducts>Les produits</TitleProducts>
        <ContainerProductsList column evenly>
          {allProducts.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </ContainerProductsList>
      </FlexDiv>
    </>
  );
};

export default Products;

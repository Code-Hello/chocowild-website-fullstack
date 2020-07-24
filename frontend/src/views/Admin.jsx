import React, { useState, useEffect } from "react";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import { TextParagraph } from "../styles/texts";
import { FlexDiv } from "../styles/containers";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";

const WrapperSection = styled.section`
  margin: 1rem 0;
`;

const DivSelect = styled.div`
  margin: 1rem 0;

  select {
    width: 100%;
  }
`;

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [datasToAddProduct, setDatasToAddProduct] = useState({});

  const [datasToAddCategory, setDatasToAddCategory] = useState({});

  //add a product
  const handleChangeAddProduct = (e) => {
    setDatasToAddProduct({
      ...datasToAddProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddProduct = async (e) => {
    e.preventDefault();
    if (
      !datasToAddProduct.name ||
      !datasToAddProduct.description ||
      !datasToAddProduct.price ||
      !datasToAddProduct.stock_quantity
    ) {
      toast.warn(`Tous les champs doivent être renseignés...`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        await Axios.post("http://localhost:8000/api/products", {
          name: datasToAddProduct.name,
          description: datasToAddProduct.description,
          price: datasToAddProduct.price,
          stock_quantity: datasToAddProduct.stock_quantity,
          id_category: datasToAddProduct.id_category,
        });
        toast.success(`Produit rajoutée avec succès !`, {});
      } catch (error) {
        toast.error(`Erreur lors de l'ajout : ${error.message}`, {});
      }
    }
  };

  //delete a product

  //add a category
  const handleChangeAddCategory = (e) => {
    setDatasToAddCategory({
      ...datasToAddCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddCategory = async (e) => {
    e.preventDefault();
    if (!datasToAddCategory.name) {
      toast.warn(`Tous les champs doivent être renseignés...`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        await Axios.post("http://localhost:8000/api/categories", {
          name: datasToAddCategory.name,
        });
        toast.success(`Catégorie rajoutée avec succès !`, {});
      } catch (error) {
        toast.error(`Erreur lors de l'ajout : ${error.message}`, {});
      }
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await Axios.get(
          `http://localhost:8000/api/categories`,
          {
            headers: { Accept: "application/json" },
          }
        );
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCategories();
  }, [categories]);

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  if (error) {
    return <div>Error !</div>;
  }

  return (
    <>
      <FlexDiv column>
        <WrapperSection>
          <Form submitFunc={handleSubmitAddProduct}>
            <TextParagraph grey>Ajouter un produit</TextParagraph>
            <Input
              labelText="Nom du produit"
              inputType="text"
              nameForInput="name"
              inputPlaceHolder="Tablette de chocolat au café"
              value={datasToAddProduct.name}
              onChangeFunc={handleChangeAddProduct}
              inputRequired
            />
            <Input
              labelText="Description"
              inputType="textarea"
              nameForInput="description"
              inputPlaceHolder="Chocolat avec du caractère"
              value={datasToAddProduct.description}
              onChangeFunc={handleChangeAddProduct}
              inputRequired
            />
            <Input
              labelText="Prix"
              inputType="text"
              nameForInput="price"
              inputPlaceHolder="10.95"
              value={datasToAddProduct.price}
              onChangeFunc={handleChangeAddProduct}
              inputRequired
            />
            <Input
              labelText="Image"
              inputType="text"
              nameForInput="image"
              inputPlaceHolder="Image du produit"
              value={datasToAddProduct.image}
              onChangeFunc={handleChangeAddProduct}
            />
            <Input
              labelText="Quantité en stock"
              inputType="number"
              nameForInput="stock_quantity"
              inputPlaceHolder="Quantité du produit en stock"
              value={datasToAddProduct.stock_quantity}
              onChangeFunc={handleChangeAddProduct}
            />
            <DivSelect>
              <select
                name="id_category"
                id="id_category"
                onChange={handleChangeAddProduct}
              >
                {categories.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </select>
            </DivSelect>
            <Button buttonType="submit" greyBg hoverCoffee>
              Ajouter le produit
            </Button>
          </Form>
        </WrapperSection>
        <WrapperSection>
          <Form submitFunc={handleSubmitAddCategory}>
            <TextParagraph grey>
              Ajouter une catégorie de produits
            </TextParagraph>
            <Input
              labelText="Nom de la catégorie"
              inputType="text"
              nameForInput="name"
              inputPlaceHolder="Tablette de chocolat"
              value={datasToAddCategory.name}
              onChangeFunc={handleChangeAddCategory}
            />
            <Button buttonType="submit" greyBg hoverCoffee>
              Ajouter la catégorie
            </Button>
          </Form>
        </WrapperSection>
      </FlexDiv>
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

export default Admin;

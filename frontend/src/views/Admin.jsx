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

const Admin = () => {
  const [categories, setCategories] = useState([]);

  const [datasToAddProduct, setDatasToAddProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock_quantity: "",
    id_category: "",
  });

  const [datasToAddCategory, setDatasToAddCategory] = useState({
    name: "",
  });

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
          ...datasToAddProduct,
        });
        toast.success(`Rajouté avec succès !`, {});
      } catch (error) {
        toast.error(`Erreur lors de l'ajout : ${error.message}`, {});
      }
    }
  };

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
          ...datasToAddCategory,
        });
        toast.success(`Rajouté avec succès !`, {});
      } catch (error) {
        toast.error(`Erreur lors de l'ajout : ${error.message}`, {});
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <FlexDiv column>
        <WrapperSection>
          <Form submitFuncToPass={handleSubmitAddProduct}>
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
            <select name="" id="">
              {categories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
            <Button buttonType="submit" greyBg hoverCoffee>
              Ajouter le produit
            </Button>
          </Form>
        </WrapperSection>
        <WrapperSection>
          <Form submitFuncToPass={handleSubmitAddCategory}>
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
    </>
  );
};

export default Admin;

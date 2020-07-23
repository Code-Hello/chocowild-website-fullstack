import React, { useState } from "react";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import { TitlePage } from "../styles/texts";

import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";

const WrapperForm = styled.div`
  padding: 2rem;
  border: ${(props) => props.borderRight && '2px solid "#3a3835"'};
`;

const SignUp = (props) => {
  const [datas, setDatas] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [isPasswordOk, setIsPasswordOk] = useState(false);

  const checkPasswordStandard = (pass) =>
    pass.length >= 8 ? setIsPasswordOk(true) : setIsPasswordOk(false);

  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkPasswordStandard(datas.password);
    if (!datas.email || !datas.password || !datas.passwordCheck) {
      toast.warn(`Tous les champs doivent être renseignés...`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (!isPasswordOk) {
      toast.error(
        "Le mot de passe doit comporter 8 caractères au minimum...",
        {}
      );
    } else if (datas.password !== datas.passwordCheck) {
      toast.error("Les mots de passe doivent correspondre", {});
    } else {
      try {
        await Axios.post("http://localhost:8000/api/users", {
          ...datas,
        });
        setTimeout(() => {
          props.history.push("/");
        }, 2500);
        toast.success(`Rajouté avec succès !`, {});
      } catch (error) {
        toast.error(`Erreur lors de l'ajout : ${error.message}`, {});
      }
    }
  };

  return (
    <>
      <TitlePage>S'enregistrer</TitlePage>
      <Form submitFuncToPass={handleSubmit}>
        <Input
          labelText="Lastname"
          inputType="text"
          nameForInput="lastname"
          inputPlaceHolder="Jean"
          value={datas.lastname}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Firstname"
          inputType="text"
          nameForInput="firstname"
          inputPlaceHolder="Dupont"
          value={datas.firstname}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Adresse"
          inputType="text"
          nameForInput="street"
          inputPlaceHolder="1 Rue de la Liberté"
          value={datas.street}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Ville"
          inputType="text"
          nameForInput="city"
          inputPlaceHolder="Paris"
          value={datas.city}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Code Postal"
          inputType="text"
          nameForInput="postal_code"
          inputPlaceHolder="75000"
          value={datas.postal_code}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Email"
          inputType="email"
          nameForInput="email"
          inputPlaceHolder="Email de connexion..."
          value={datas.email}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Mot de passe"
          inputType="password"
          nameForInput="password"
          inputPlaceHolder="Mot de passe..."
          value={datas.password}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Confirmation du mot de passe"
          inputType="password"
          nameForInput="passwordCheck"
          inputPlaceHolder="Mot de passe..."
          value={datas.passwordCheck}
          onChangeFunc={handleChange}
          inputRequired
        />
        <Input
          labelText="Numéro de téléphone"
          inputType="text"
          nameForInput="phone_number"
          inputPlaceHolder="0000000"
          value={datas.phone_number}
          onChangeFunc={handleChange}
        />
        <Button buttonType="submit" coffee greyBg hoverCoffee>
          S'enregistrer
        </Button>
      </Form>
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

export default SignUp;

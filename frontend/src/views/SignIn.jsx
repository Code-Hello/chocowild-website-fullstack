import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

import { addUserToState } from "../actions/userActions";

import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import { TitlePage, TextParagraph } from "../styles/texts";
import { FlexDiv } from "../styles/containers";

import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";

const ContainerSign = styled(FlexDiv)`
  ${(props) => props.theme.mediaMax.small`
    flex-direction: column;
    align-items: center;
`};
`;

const WrapperForm = styled.div`
  padding: ${(props) => (props.bigPad ? "10rem" : "2rem")};
  width: 50%;
  text-align: center;
  border-right: ${(props) => props.borderRight && "1px solid #3a3835"};

  ${(props) => props.theme.mediaMax.small`
    padding: 1rem;
    width: 80%;
    border-right: none;
    border-bottom: ${(props) => props.borderBottom && "1px solid #3a3835"};
  `};
`;

const SignIn = (props) => {
  const [datas, setDatas] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("", {
        ...datas,
      });
      setTimeout(() => {
        props.history.push("/");
      }, 1500);
      toast.success(`${datas.email} est Loggé`, {});
    } catch (err) {
      toast.error(`${err.message}`, {});
    }
  };

  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <TitlePage>Connectez-vous</TitlePage>
      <ContainerSign center>
        <WrapperForm borderRight borderBottom>
          <Form submitFuncToPass={handleSubmit}>
            <TextParagraph grey>Se connecter</TextParagraph>
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
            <Button buttonType="submit" greyBg hoverCoffee>
              Se connecter
            </Button>
          </Form>
        </WrapperForm>
        <WrapperForm bigPad>
          <Link to="/sign-up">
            <TextParagraph grey>S'enregistrer</TextParagraph>
          </Link>
        </WrapperForm>
      </ContainerSign>
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
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUserToState: (idUser, emailUser, role) =>
      dispatch(addUserToState(idUser, emailUser, role)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

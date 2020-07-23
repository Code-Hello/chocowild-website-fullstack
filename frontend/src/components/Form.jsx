import React from "react";
import styled from "styled-components";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const TitleStyled = styled.h2`
  align-self: start;
`;

const Form = ({ formTitle, children, submitFunc }) => {
  return (
    <FormStyled onSubmit={submitFunc}>
      {formTitle && <TitleStyled>{formTitle}</TitleStyled>}
      {children}
    </FormStyled>
  );
};

export default Form;

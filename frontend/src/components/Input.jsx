import React from "react";
import styled from "styled-components";
import { FlexDiv } from "../styles/containers";

const DivInput = styled(FlexDiv)`
  width: 100%;
  margin: 20px 0;
`;

const InputStyled = styled.input`
  background-color: ${(props) => props.theme.white};
  padding: 5px;
  border: none;
  border-radius: 8px;
`;

const LabelStyled = styled.label`
  align-self: start;
  color: ${(props) => props.theme.grey};
  margin-bottom: 0.3rem;
`;

const InputCpnt = ({
  labelText,
  inputType,
  nameForInput,
  inputPlaceHolder,
  value,
  onChangeFunc,
  inputRequired,
}) => {
  return (
    <DivInput column>
      <LabelStyled htmlFor={nameForInput}>{labelText}</LabelStyled>
      <InputStyled
        type={inputType}
        id={nameForInput}
        name={nameForInput}
        value={value}
        placeholder={inputPlaceHolder}
        onChange={onChangeFunc}
        required={inputRequired}
      />
    </DivInput>
  );
};

export default InputCpnt;

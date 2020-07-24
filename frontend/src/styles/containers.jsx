import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: ${(props) => props.between && "space-between"};
  justify-content: ${(props) => props.around && "space-around"};
  justify-content: ${(props) => props.evenly && "space-evenly"};
  justify-content: ${(props) => props.center && "center"};
  cursor: ${(props) => props.pointer && "pointer"};
`;

export const WrapperAppli = styled.div`
  margin-top: 10rem;
`;

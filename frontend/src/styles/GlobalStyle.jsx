import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  a, li {
    text-decoration: none;
    list-style: none;
    color: ${(props) => props.theme.grey};;
  }
`;

export default GlobalStyle;

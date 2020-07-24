import React from "react";

import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import "react-toastify/dist/ReactToastify.css";

import ProjectRouter from "./router/Router";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ProjectRouter />
      </ThemeProvider>
    </>
  );
}

export default App;

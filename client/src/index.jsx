import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './styles/globalStyles.styles';
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <GlobalStyles />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);

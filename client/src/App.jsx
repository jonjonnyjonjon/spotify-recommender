import { Box } from "@chakra-ui/react";
import React from 'react';

import Dashboard from './Dashboard';
import Login from './Login';


const App = () => {
  const code = new URLSearchParams(window.location.search).get('code');

  return <Box>{code ? <Dashboard code={code} /> : <Login />}</Box>;
};

export default App;

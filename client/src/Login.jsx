import React from 'react';

import { LoginButton, LoginLink } from './styles/Login.styles';
import { Container } from './styles/App.styles';

const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <Container>
      <LoginButton>
        <LoginLink href={AUTH_URL}>Login with Spotify</LoginLink>
      </LoginButton>
    </Container>
  );
};

export default Login;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Home, Login, Register, Profile } from '../pages';
import { baseTheme } from '../styles';
import { login, home, profile, register } from './routes';

const App = () => {
  return(
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={baseTheme}
    >
      <BrowserRouter>
        <Routes>
          <Route path={home} element={<Home />} />
          <Route path={login} element={<Login />} />
          <Route path={register} element={<Register />} />
          <Route path={profile} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export { App };
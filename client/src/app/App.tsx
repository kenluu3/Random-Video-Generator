import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Home, Login, Register, Profile } from '../pages';
import { baseTheme } from '../styles';
import { appRoutes } from './routes';

const App = () => {
  return(
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={baseTheme}
    >
      <BrowserRouter>
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.login} element={<Login />} />
          <Route path={appRoutes.register} element={<Register />} />
          <Route path={appRoutes.user} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export { App };
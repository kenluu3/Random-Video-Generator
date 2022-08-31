import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Error, Favorites, Home, Login, Register, Profile } from '../pages';
import { useAppSelector } from './store';
import { baseTheme } from '../styles';
import { appRoutes } from './routes';

const App = () => {
  const account = useAppSelector((state) => state.account);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={baseTheme}
    >
      <NotificationsProvider position='top-center' zIndex={2088}>
        <BrowserRouter>
          <Routes>
            <Route path={appRoutes.home} element={<Home />} />
            <Route path={appRoutes.login} element={<Login />} />
            <Route path={appRoutes.register} element={<Register />} />
            <Route path={appRoutes.favorites} element={<Favorites />} />
            <Route path={appRoutes.user} element={account.loggedIn ? <Profile /> : <Home />} />
            <Route path={'*'} element={<Error />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export { App };
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Home, Login, Register, Profile } from './pages';
import { baseTheme } from './styles';

const App = () => {
  return(
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={baseTheme}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/:username' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App;
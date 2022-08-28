import React from 'react';
import { Center } from '@mantine/core';
import { LoginForm } from '../../components';

const Login = () => {
  return (
    <Center
      sx={{
        height: '100vh'
      }}
    >
      <LoginForm />
    </Center>
  )
}

export { Login };
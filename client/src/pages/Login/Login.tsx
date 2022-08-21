import React from 'react';
import { Center, useMantineTheme } from '@mantine/core';
import { LoginForm } from '../../components';

const Login = () => {
  const theme = useMantineTheme();

  return (
    <Center
      sx={{
        height: '100vh',
        backgroundColor: theme.colors.gray[2]
      }}
    >
      <LoginForm />
    </Center>
  )
}

export { Login };
import React from 'react';
import { Center, useMantineTheme } from '@mantine/core';
import { RegisterForm } from '../../components';

const Register = () => {
  const theme = useMantineTheme();

  return (
    <Center
      sx={{
        height: '100vh',
        backgroundColor: theme.colors.gray[2]
      }}
    >
      <RegisterForm />
    </Center>
  )
}

export { Register };
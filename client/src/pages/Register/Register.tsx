import React from 'react';
import { Center } from '@mantine/core';
import { RegisterForm } from '../../components';

const Register = () => {
  return (
    <Center
      sx={{
        height: '100vh',
      }}
    >
      <RegisterForm />
    </Center>
  )
}

export { Register };
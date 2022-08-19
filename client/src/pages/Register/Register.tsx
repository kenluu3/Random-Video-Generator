import React from 'react';
import { Center, createStyles } from '@mantine/core';
import { RegisterForm } from '../../components';

const useStyles = createStyles((theme) => ({
  pageContainer: {
    height: '100vh',
    backgroundColor: theme.colors.gray[0]
  }
}))

const Register = () => {
  const { classes } = useStyles();

  return (
    <Center
      className={classes.pageContainer}
    >
      <RegisterForm />
    </Center>
  )
}

export { Register };
import React from 'react';
import { Center, createStyles } from '@mantine/core';
import { LoginForm } from '../../components';

const useStyles = createStyles((theme) => ({
  pageContainer: {
    height: '100vh',
    backgroundColor: theme.colors.gray[0]
  }
}))

const Login = () => {
  const { classes } = useStyles();

  return (
    <Center
      className={classes.pageContainer}
    >
      <LoginForm />
    </Center>
  )
}

export { Login };
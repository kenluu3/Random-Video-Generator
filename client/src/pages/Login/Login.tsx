import React from 'react';
import { Center, createStyles } from '@mantine/core';
import { LoginForm } from '../../components';

const useStyles = createStyles((theme) => ({
  loginWrapper: {
    height: '100vh',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4]
  }
}))

const Login = () => {
  const { classes } = useStyles();

  return (
    <Center className={classes.loginWrapper}>
      <LoginForm />
    </Center>
  )
}

export { Login };
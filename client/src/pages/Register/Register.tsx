import React from 'react';
import { Center, createStyles } from '@mantine/core';
import { RegisterForm } from '../../components';

const useStyles = createStyles((theme) => ({
  registerWrapper: {
    height: '100vh',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4]
  }
}))

const Register = () => {
  const { classes } = useStyles();
  return (
    <Center className={classes.registerWrapper}>
      <RegisterForm />
    </Center>
  )
}

export { Register };
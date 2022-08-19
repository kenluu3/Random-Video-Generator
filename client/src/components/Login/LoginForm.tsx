import React from 'react';
import { Button, Paper, Center, TextInput, PasswordInput, createStyles, Text } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons';
import { Logo } from '../Common/Logo';

const useStyles = createStyles((theme) => ({
  formWrapper: {
    width: '550px',
    height: '600px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 50px',
  }
}));

const LoginForm = () => {
  const { classes } = useStyles();

  return (
    <Paper
      p='md'
      withBorder
      className={classes.formWrapper}
    > 
      <Center p='xl'>
        <Logo />
      </Center>
      <Center>
        <Text
        size='xl'
        weight={700}
        transform='uppercase'
        >
          Account Login
        </Text>
      </Center>
      <form
        className={classes.formContainer}
      >
        <TextInput
          label='USERNAME'
          icon={<IconUser />}
          placeholder='username'
          required
          variant='filled'
          size='md'
        />
        <PasswordInput
          label='PASSWORD'
          icon={<IconLock />}
          placeholder='password'
          required
          variant='filled'
          size='md'
        />
        <Button
          uppercase
          size='md'
        >
          Login
        </Button>
      </form>
    </Paper>
  )
}

export { LoginForm };
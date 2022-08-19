import React from 'react';
import { Button, Paper, Center, TextInput, PasswordInput, createStyles, Text } from '@mantine/core';
import { Logo } from '../Common/Logo';

const useStyles = createStyles((theme) => ({
  formWrapper: {
    width: '550px',
    height: '600px',
  },
  formContainer: {
    height: '75%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 50px',
    justifyContent: 'space-between'
  }
}));

const Form = () => {
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
          Registration
        </Text>
      </Center>
      <form
        className={classes.formContainer}
      >
        <TextInput
          label='EMAIL'
          placeholder='example@mail.com'
          required
          variant='filled'
          type='email'
          size='md'
        />
        <TextInput
          label='USERNAME'
          description='Username should be between 5 and 25 characters'
          placeholder='username'
          required
          variant='filled'
          size='md'
        />
        <PasswordInput
          label='PASSWORD'
          description='Password should be between 5 and 25 characters'
          placeholder='password'
          required
          variant='filled'
          size='md'
        />
        <Button
          uppercase
          size='md'
        >
          Register
        </Button>
      </form>
    </Paper>
  )
}

export { Form };
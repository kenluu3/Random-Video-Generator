import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, Center, TextInput, PasswordInput, Text, createStyles, Stack } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons'
import { Logo } from '../Common/Logo';
import { register } from '../../app';

const loginFormStyles = createStyles((theme) => ({
  formContainer: {
    width: '25vw',
    height: '50vh',
  },
  form: {
    height: '65%',
    padding: '10% 10%'
  }
}));

const handleLogin = () => {

}

const LoginForm = () => {
  const { classes } = loginFormStyles()

  return (
    <Paper
      className={classes.formContainer}
    >
      <Center
        p='md'
      >
        <Logo />
      </Center>
      <form
        className={classes.form}
      >
        <Stack
          spacing='sm'
          justify='space-between'
          sx={{
            height: '100%'
          }}
        >
          <TextInput 
            label='USERNAME'
            icon={<IconUser />}
            required
            minLength={5}
            maxLength={25}
            placeholder='username'
          />
          <PasswordInput
            label='PASSWORD'
            icon={<IconLock />}
            required
            minLength={5}
            maxLength={25}
            placeholder='password'
          />
          <Stack
            spacing={0}
          >
            <Button>
              Login
            </Button>
            <Text
              size='xs'
            >
              Don't have an account? Click <Link to={register}>here</Link> to register.
            </Text>
          </Stack>
        </Stack>
      </form>
    </Paper>
  )
}

export { LoginForm };
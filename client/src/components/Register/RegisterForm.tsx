import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, Stack, Center, Text, TextInput, PasswordInput, createStyles } from '@mantine/core';
import { IconAt, IconLock, IconUser } from '@tabler/icons';
import { Logo } from '../../components';
import { login } from '../../app';

const registerFormStyles = createStyles((theme) => ({
  formContainer: {
    width: '25vw',
    height: '50vh',
  },
  form: {
    height: '80%',
    padding: '0 10%'
  }
}));

const handleRegister = () => {
  
}

const RegisterForm = () => {
  const { classes } = registerFormStyles();

  return (
    <Paper
      className={classes.formContainer}
    >
      <Center
        p='xs'
      >
        <Logo />
      </Center>
      <form
        className={classes.form}
      >
        <Stack
          spacing='sm'
          justify="space-between"
          sx={{
            height: '100%'
          }}
        >
          <TextInput 
            label='EMAIL'
            icon={<IconAt />}
            required
            placeholder='example@mail.com'
            type='email'
          />
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
          <PasswordInput
            label='CONFIRM PASSWORD'
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
              Register
            </Button>
            <Text
              size='xs'
            >
              Already have an account? Click <Link to={login}>here</Link> to login.
            </Text>
          </Stack>
        </Stack>
      </form>
    </Paper>
  )
}

export { RegisterForm };
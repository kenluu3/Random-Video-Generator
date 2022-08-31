import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Center, Paper, TextInput, Text, PasswordInput, Stack, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications'; 
import { useForm } from '@mantine/form';
import { IconUser, IconLock } from '@tabler/icons';
import { Logo } from '../Common/Logo';
import { accountActions, appRoutes, useAppDispatch } from '../../app';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => { 
        const trimUsername = value.trim();

        if (trimUsername.length == 0)
          return 'Username field cannot be empty';
        
        if (trimUsername.length < 5 || trimUsername.length > 25)
          return 'Invalid username';

        const alphaNumRegex = new RegExp(/^[a-z0-9]+$/i);
        if (!alphaNumRegex.test(trimUsername))
          return 'Invalid username';
      },
      password: (value) => {
        const trimPassword = value.trim();

        if (trimPassword.length == 0) 
          return 'Password field cannot be empty';
        
        if (trimPassword.length < 5 || trimPassword.length > 25) 
          return 'Invalid credentials';
      }
    }
  });

  const handleLogin = async () => {
    if (!form.validate().hasErrors) {
      const result = await dispatch(accountActions.accountLogin(form.values));   
      
      if (accountActions.accountLogin.rejected.match(result)) {
        form.setErrors({ username: 'Invalid credentials entered', password: 'Invalid credentials entered' });
      } else if (accountActions.accountLogin.fulfilled.match(result)) {
        navigate(appRoutes.home);
        showNotification({
          message: 'You have logged in successfully.',
          autoClose: 2000,
        })
      }
    }
  }

  return (
    <Paper
      p='xl'
      sx={{
        width: '450px',
        height: '500px',
      }}
    >
      <Stack>
        <Stack
          spacing={0}
          sx={{
            width: '100%',
          }}
        >
          <Center>
            <Logo size={40} />
          </Center>
          <Divider size='sm' />
          <Text size={24} weight={700}>
            LOGIN
          </Text>
        </Stack>
        <form>
          <Stack spacing='md'>
            <TextInput
              icon={<IconUser />}
              placeholder='Username'
              variant='filled'
              {...form.getInputProps('username')}
            />
            <PasswordInput
              icon={<IconLock />}
              placeholder='Password'
              variant='filled'
              {...form.getInputProps('password')}
            />
            <Stack spacing={5}>
              <Button
                onClick={handleLogin}
              >
                Login
              </Button>
              <Text>
                Don't have an account? Click <Link to={appRoutes.register} style={{textDecoration: 'none'}}>here</Link> to register
              </Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export { LoginForm };
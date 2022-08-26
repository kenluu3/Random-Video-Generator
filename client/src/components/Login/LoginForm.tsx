import React, { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Center, Paper, Stack, TextInput, PasswordInput, Text } from '@mantine/core';
import { Logo } from '../Common/Logo';
import { IconUser, IconLock } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useAppDispatch, accountActions, appRoutes } from '../../app';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!form.validate().hasErrors) {
      const result = await dispatch(accountActions.accountLogin(form.values));   
      
      if (accountActions.accountLogin.rejected.match(result)) {
        form.setErrors({ username: 'Invalid credentials entered', password: 'Invalid credentials entered' });
      } else if (accountActions.accountLogin.fulfilled.match(result)) {
        navigate(appRoutes.home);
      }
    }
  }

  return (
    <Paper>
      <Stack>
        <Center>
          <Logo />
        </Center>
        <form>
          <Stack>
            <TextInput
              icon={<IconUser />}
              variant='filled'
              placeholder='Username'
              autoComplete='true'
              {...form.getInputProps('username')}
            />
            <PasswordInput 
              icon={<IconLock />} 
              variant='filled' 
              placeholder='Password'
              autoComplete='true'
              {...form.getInputProps('password')}
            />
            <Stack spacing={0}>
              <Button onClick={handleLogin}>Login</Button>
              <Text>
                Don't have an account? Click <Link to={appRoutes.register}>here</Link> to create an account
              </Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export { LoginForm };
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Center, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconUser, IconLock } from '@tabler/icons';
import { Logo } from '../Common/Logo';
import { accountActions, appRoutes, useAppDispatch, loginValidation } from '../../app';
import '../../styles/base-form.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const form = useForm({
    initialValues: { username: '', password: '' },
    validate: {
      username: loginValidation.username,
      password: loginValidation.password,
    },
  })

  const login = async () => {
    if (!form.validate().hasErrors) {
      const response = await dispatch(accountActions.accountLogin(form.values));

      if (accountActions.accountLogin.rejected.match(response)) {
        form.setErrors({ username: 'Invalid credentials entered', password: 'Invalid credentials entered' });
      } else {
        navigate(appRoutes.home); 
        showNotification({ message: response.payload.message, autoClose: 2000 });
      }
    }
  }

  return (
    <Paper className='form-container' pt={50}>
      <Center>
        <Logo size={50} />
      </Center>
      <form className='form'>
        <TextInput
          icon={<IconUser />}
          placeholder='Username'
          autoComplete='true'
          {...form.getInputProps('username')}
        />
        <PasswordInput
          icon={<IconLock />}
          placeholder='Password'
          autoComplete='true'
          {...form.getInputProps('password')}
        />
        <Stack spacing={0}>
          <Button onClick={login}>
            Login
          </Button>
          <Text size={14}>
            Don't have an account? Click <Link to={appRoutes.register} className='link'>here</Link> to register
          </Text>
        </Stack>
      </form>
    </Paper>
  )
}

export { LoginForm };
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Center, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconAt, IconUser, IconLock } from '@tabler/icons';
import { Logo } from '../Common/Logo';
import { accountAPI, appRoutes, registerValidation } from '../../app';
import '../../styles/base-form.scss';

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: '', username: '', password: '', confirmPassword: '' },
    validate: { 
      email: registerValidation.email,
      username: registerValidation.username, 
      password: registerValidation.password,
      confirmPassword: registerValidation.confirmPassword,
    },
  })

  const register = async () => {
    if (!form.validate().hasErrors) {
      try {
        const response = await accountAPI.register(form.values);
        navigate(appRoutes.login);
        showNotification({ message: response.data.message, autoClose: 2000 });
      } catch (error: any) {
        const { response } = error;

        if (response.status === 400) {
          if (response.data.error[0].param === 'username')
            form.setFieldError('username', response.data.error[0].msg);

          if (response.data.error[0].param === 'email')
            form.setFieldError('email', response.data.error[0].msg);
        }
      }
    }
  }

  return (
    <Paper className='form-container' pt={50}>
      <Center>
        <Logo size={50} />
      </Center>
      <form className='form-register'>
        <TextInput
          icon={<IconAt />}
          placeholder='Email'
          autoComplete='true'
          {...form.getInputProps('email')}
        />
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
        <PasswordInput
          icon={<IconLock />}
          placeholder='Confirm Password'
          autoComplete='true'
          {...form.getInputProps('confirmPassword')}
        />
        <Stack spacing={0}>
          <Button onClick={register}>
            Register
          </Button>
          <Text size={14}>
            Already have an account? Click <Link to={appRoutes.login} className='link'>here</Link> to login
          </Text>
        </Stack>
      </form>
    </Paper>
  )
}

export { RegisterForm };
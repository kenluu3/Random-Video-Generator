import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Center, Paper, Stack, TextInput, PasswordInput, Text, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconUser, IconLock } from '@tabler/icons';
import { Logo } from '../Common/Logo';
import { accountAPI, appRoutes } from '../../app';

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => {
        const trimEmail = value.trim();

        if (trimEmail.length == 0)
          return 'Email field cannot be empty';

        const emailRegex = new RegExp(/^\S+@\S+$/);
        if (!emailRegex.test(trimEmail)) 
          return 'Invalid email'  
      }, 
      username: (value) => {
        const trimUsername = value.trim();

        if (trimUsername.length == 0)
          return 'Username field cannot be empty';
        
        if (trimUsername.length < 5 || trimUsername.length > 25)
          return 'Username must be between 5 and 25 characters';

        const alphaNumRegex = new RegExp(/^[a-z0-9]+$/i);
        if (!alphaNumRegex.test(trimUsername))
          return 'Username must contain only alphanumeric characters';
      },
      password: (value) => {
        const trimPassword = value.trim();

        if (trimPassword.length == 0) 
          return 'Password field cannot be empty';
        
        if (trimPassword.length < 5 || trimPassword.length > 25) 
          return 'Password must be between 5 and 25 characters';
      },
      confirmPassword: (value, values) => {
        const trimConfirmPassword = value.trim();

        if (trimConfirmPassword !== values.password || !values.password)
          return 'Passwords did not match'
      }
    }
  });

  const handleRegister = async () => {    
    if (!form.validate().hasErrors) {
      try {
        const response = await accountAPI.register(form.values);
        if (response.status === 200) navigate(appRoutes.login);
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
    <Paper
      p ='xl'
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
            REGISTRATION
          </Text>
        </Stack>
        <form>
          <Stack spacing='sm'>
            <TextInput
              icon={<IconAt />}
              placeholder='Email'
              variant='filled'
              {...form.getInputProps('email')}
            />
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
            <PasswordInput
              icon={<IconLock />}
              placeholder='Confirm Password'
              variant='filled'
              {...form.getInputProps('confirmPassword')}
            />
            <Stack spacing={5}>
              <Button
                onClick={handleRegister}
              >
                Register
              </Button>
              <Text>
                Already have an account? Click <Link to={appRoutes.login} style={{textDecoration: 'none'}}>here</Link> to login
              </Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export { RegisterForm };
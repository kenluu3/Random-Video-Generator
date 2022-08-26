import React, { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Center, Paper, Stack, TextInput, PasswordInput, Text } from '@mantine/core';
import { Logo } from '../Common/Logo';
import { IconUser, IconLock } from '@tabler/icons';
import { useForm } from '@mantine/form';
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
  })

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();
    
    if (!form.validate().hasErrors) {
      try {
        const response = await accountAPI.register(form.values);

        if (response.status === 200) 
          navigate(appRoutes.login);

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
              placeholder='Email'
              type='email'
              autoComplete='true'
              {...form.getInputProps('email')}
            />
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
            <PasswordInput 
              icon={<IconLock />} 
              variant='filled' 
              placeholder='Confirm Password'
              autoComplete='true'
              {...form.getInputProps('confirmPassword')}
            />
            <Stack spacing={0}>
              <Button onClick={handleRegister}>Register</Button>
              <Text>
                Already have an account? Click <Link to={appRoutes.login}>here</Link> to login
              </Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export { RegisterForm };
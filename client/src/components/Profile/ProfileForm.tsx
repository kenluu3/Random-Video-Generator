import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group, Paper, PasswordInput, Stack, Switch, Title, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconAt, IconCalendar, IconUser, IconLock } from '@tabler/icons';
import { accountActions, appRoutes, useAppSelector, useAppDispatch, profileValidation } from '../../app';
import '../../styles/form.scss';

const ProfileForm = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const form = useForm({ 
    initialValues: { email: '', username: '',  password: '' },
    initialDirty: { email: false, username: false, password: false },
    validate: { 
      email: profileValidation.email,
      username: profileValidation.username, 
      password: profileValidation.password,
    },
  })

  const update = async () => {
    let values = {};

    if (form.isDirty()) {
      if (form.isDirty('email') && form.validateField('email') && form.isValid('email'))
        if (form.values.email.toLowerCase() !== account.email)
          values = { ...values, email: form.values.email };
      if (form.isDirty('username') && form.validateField('username') && form.isValid('username'))
        if (form.values.username.toLowerCase() !== account.username)
          values = { ...values, username: form.values.username };
      if (form.isDirty('password') && form.validateField('password') && form.isValid('password'))
        values = { ...values, password: form.values.password };
      
      if (Object.keys(values)) {
        const response = await dispatch(accountActions.accountUpdate(values));   

        if (accountActions.accountUpdate.rejected.match(response)) {
          const error = response.payload as any;

          if (error === 'Unauthorized') {
            showNotification({ message: error.response.data, autoClose: 2000 });
            dispatch(accountActions.accountReset());
            navigate(appRoutes.login);
          } else {
            error.error.forEach((err: any) => {
              if (err.param === 'username') form.setFieldError('username', err.msg);
              if (err.param === 'email') form.setFieldError('email', err.msg);
            })
          }
        } else {
          showNotification({ message: response.payload.message, autoClose: 2000 });
          setEdit(!edit);
        }
      }
    }
  }

  const reset = () => form.reset();
  const toggleEdit = () => setEdit(!edit);

  return (
    <Stack>
      <Group position='apart'>
        <Title order={1}>ACCOUNT SETTINGS</Title>
        <Group>
          <Switch onClick={toggleEdit} label='TOGGLE EDIT' />
          <Button onClick={reset} variant='subtle'>Reset Form</Button>
        </Group>
      </Group>
      <Paper m='xl' p='md'>
        <form className='form-profile'>
          <TextInput
            icon={<IconAt />}
            label='EMAIL'
            placeholder={account.email.toUpperCase()}
            {...form.getInputProps('email')}
            disabled={!edit}
            autoComplete='true'
          />
          <TextInput
            icon={<IconUser />}
            label='USERNAME'
            placeholder={account.username.toUpperCase()}
            {...form.getInputProps('username')}
            disabled={!edit}
            autoComplete='true'
          />
          <PasswordInput
            icon={<IconLock />}
            label='PASSWORD'
            placeholder='SET NEW PASSWORD' 
            {...form.getInputProps('password')}
            disabled={!edit}
            autoComplete='true'
          />
          <Group position='apart' grow mb='xl'>
            <TextInput
              icon={<IconCalendar />}
              label='REGISTER DATE'
              placeholder={account.registerDate}
              disabled
            />
            <TextInput 
              label='ACTIVE'
              placeholder='TRUE'
              disabled
            />
          </Group>
          <Button
            onClick={update}
            disabled={!edit}
            fullWidth
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Stack>
  )
}

export { ProfileForm };
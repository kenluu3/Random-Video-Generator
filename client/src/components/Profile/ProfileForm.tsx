import React, { useState } from 'react';
import { Group, Button, Paper, TextInput, PasswordInput, Stack, Switch, Text, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useAppSelector, useAppDispatch, accountActions } from '../../app';

const ProfileForm = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(true);

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    initialDirty: {
      email: false,
      username: false,
      password: false,
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
    }
  })

  const handleUpdateAccount = async () => {
    let updateValues = {};
    let updateFlag = true;

    if (form.isDirty()) {
      if (form.isDirty('email')) {
        if (form.validateField('email') && form.isValid('email')) {
          updateValues = { ...updateValues, email: form.values.email };
        } else {
          updateFlag = false;
        }
      }

      if (form.isDirty('username')) {
        if (form.validateField('username') && form.isValid('username')) {
          updateValues = { ...updateValues, username: form.values.username };
        } else {
          updateFlag = false;
        }
      }

      if (form.isDirty('password')) {
        if (form.validateField('password') && form.isValid('password')) {
          updateValues = { ...updateValues, password: form.values.password };
        } else {
          updateFlag = false;
        }
      }

      if (updateFlag) {
        await dispatch(accountActions.accountUpdate(updateValues));
        setEdit(!edit);

        showNotification({
          message: 'Sucessfully updated profile information',
          autoClose: 2000,
        })
      }
    }
  }

  const handleFormReset = () => {
    form.reset();
  }

  return (
    <Stack p={120}>
      <Group
        position='apart'
      >
        <Text size={32} weight={700} transform='uppercase'>
            PROFILE INFORMATION
        </Text>
        <Group>
          <Button variant='subtle' onClick={handleFormReset}>Reset Form</Button>
          <Switch onClick={() => setEdit(!edit)} label='TOGGLE EDIT MODE' />
        </Group>
      </Group>
      <Divider size='sm' />
      <Paper>
        <form>
          <Stack spacing='sm'>
            <TextInput
              label='USERNAME'
              placeholder={account.username.toUpperCase()}
              disabled={edit}
              {...form.getInputProps('username')}
            />
            <TextInput
              label='EMAIL'
              placeholder={account.email.toUpperCase()}
              disabled={edit}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label='PASSWORD'
              placeholder='ENTER PASSWORD TO CHANGE CURRENT PASSWORD'
              disabled={edit}
              {...form.getInputProps('password')}
            />
            <TextInput
              label='ACTIVE'
              placeholder={'TRUE'}
              disabled
            />
            <TextInput
              label='REGISTER DATE'
              placeholder={account.registerDate}
              disabled
            />
            <Button 
              disabled={edit}
              onClick={handleUpdateAccount}
              fullWidth
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  )
}

export { ProfileForm };
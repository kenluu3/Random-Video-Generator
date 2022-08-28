import React, { useState } from 'react';
import { Group, Button, Paper, TextInput, PasswordInput, Stack, Switch, Text, Divider } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../app';

const ProfileForm = () => {
  const account = useAppSelector((state) => state.account);
  const [edit, setEdit] = useState(true);

  const handleUpdateAccount = () => {
    console.log('save changes');
  }

  return (
    <Stack p={120}>
      <Group
        position='apart'
      >
        <Text size={32} weight={700} transform='uppercase'>
            PROFILE INFORMATION
        </Text>
        <Switch onClick={() => setEdit(!edit)} label='TOGGLE EDIT MODE' />
      </Group>
      <Divider size='sm' />
      <Paper>
        <form>
          <Stack spacing='sm'>
            <TextInput
              label='USERNAME'
              placeholder={account.username.toUpperCase()}
              disabled={edit} 
            />
            <TextInput
              label='EMAIL'
              placeholder={account.email.toUpperCase()}
              disabled={edit}
            />
            <PasswordInput
              label='PASSWORD'
              placeholder='Enter new password'
              disabled={edit}
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
import React from 'react';
import { Button, TextInput, Title, Group, PasswordInput, Stack } from '@mantine/core';
import { IconDeviceTvOld } from '@tabler/icons';
import { registerFormStyles } from './styles';

const Form = () => {
  const { classes } = registerFormStyles();

  return (
    <form>
      <Group>
        <IconDeviceTvOld />
        <Title order={4}>RANDOM VIDEO PLAYER</Title>
      </Group>

      <Stack
      >
        <TextInput 
          label='EMAIL'
          placeholder='example@mail.com'
          required
        />

        <TextInput 
          label='USERNAME'
          placeholder='Username'
          description='Username must be between 5 and 25 characters'
          required
        />
        
        <PasswordInput 
          label='PASSWORD'
          placeholder='Password'
          description='Password must be between 5 and 25 characters'
          required
        />

        <Button>
          REGISTER
        </Button>
      </Stack>
    </form>
  )
}

export { Form };
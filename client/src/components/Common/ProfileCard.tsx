import React from 'react';
import { Avatar, Group, Text } from '@mantine/core';

interface ProfileCardProps {
  username: string
}

const ProfileCard = ({ username }: ProfileCardProps) => {
  return (
    <Group>
      <Avatar
        color='teal'
        variant='filled'
        radius='xl'
      >
        {username.substring(0,2).toUpperCase()}
      </Avatar>
      <Text 
        weight={700} transform='uppercase'
      >
        {username}
      </Text>
    </Group>
  )
}

export type { ProfileCardProps };
export { ProfileCard };
import React from 'react';
import { useMantineTheme, Group, Title } from '@mantine/core';
import { IconDeviceTvOld } from '@tabler/icons';

const Logo = () => {
  const theme = useMantineTheme();
  
  return (
    <Group
      spacing={5}
    >
      <IconDeviceTvOld 
        color={theme.colors.indigo[9]} 
        size={26} 
      />
      <Title 
        size={24}
      >
        RVP
      </Title>
    </Group>
  )
}

export { Logo };
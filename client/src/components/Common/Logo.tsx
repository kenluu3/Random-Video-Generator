import React from 'react';
import { Group, Text, createStyles } from '@mantine/core';
import { IconDeviceTv } from '@tabler/icons';

const logoStyles = createStyles((theme) => ({
  logoIcon: {
    color: theme.colors.indigo[9],
  },
}));

const Logo = () => {
  const { classes } = logoStyles();

  return (
    <Group
      spacing={1}
    >
      <IconDeviceTv 
        className={classes.logoIcon}
        size={26}
      />
      <Text
        size={26}
      >
        RVP
      </Text>
    </Group>
  )
}

export { Logo };
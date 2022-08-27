import React from 'react';
import { Link } from 'react-router-dom';
import { Group, Text, ThemeIcon } from '@mantine/core';
import { IconArrowsShuffle } from '@tabler/icons';
import { appRoutes } from '../../app';

interface LogoProps {
  size?: number
}

const Logo = ({ size=30 }: LogoProps) => {
  return (
    <Link
      to={appRoutes.home}
      style={{ textDecoration: 'none' }}>
      <Group
        sx={{ display: 'inline-flex' }}
        spacing={5}
      >
        <ThemeIcon
          radius='xl'
          variant='gradient' gradient={{ from: 'indigo', to: 'violet', deg: 45 }}
        >
          <IconArrowsShuffle size={size} />
        </ThemeIcon>
        <Text weight={0} size={size}>RVG</Text>
      </Group>
    </Link>
  )
}

export type { LogoProps };
export { Logo };
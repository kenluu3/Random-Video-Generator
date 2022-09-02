import React, { ReactNode } from 'react';
import { Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../../styles/base-link.scss';

interface NavigationItemProps {
  icon: ReactNode,
  label: string,
  routeTo: string,
}

const NavigationItem =({ icon, label, routeTo }: NavigationItemProps) => {
  return (
    <Link to={routeTo} className='link'>
      <Group spacing='xs'>
        {icon}
        <Text weight={700}>{label}</Text>
      </Group>
    </Link>
  )
}

export type { NavigationItemProps };
export { NavigationItem };
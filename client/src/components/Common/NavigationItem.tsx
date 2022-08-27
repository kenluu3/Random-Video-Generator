import React, { ReactNode } from 'react';
import { Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  icon: ReactNode,
  label: string,
  routeTo: string,
}

const NavigationItem = ({ icon, label, routeTo }: NavigationItemProps) => {
  return (
    <Link to={routeTo} style={{ textDecoration: 'none' }}>
      <Group spacing='sm'>
        {icon}
        <Text weight={700}>
          {label}
        </Text>
      </Group>
    </Link>
  )
}

export type { NavigationItemProps };
export { NavigationItem };
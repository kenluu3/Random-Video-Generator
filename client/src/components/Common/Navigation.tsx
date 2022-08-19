import React from 'react';
import { Link } from 'react-router-dom';
import { AppShell, Header, Navbar, Group, Text, useMantineTheme } from '@mantine/core';
import { IconHome2, IconLogin } from '@tabler/icons';
import { Logo } from './Logo';

const Navigation = (props: any) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding='md'
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.gray[0] },
      })}
      header={
        <Header
          height={60}
          p='md'
        >
          <Logo />
        </Header>
      }
      navbar={
        <Navbar 
          hiddenBreakpoint='sm'
          p='md'
          width={{ base: 180 }}
        >
          <Navbar.Section>
            <Link
              to='/'
            >
              <Group 
                spacing={5} 
              >
                <IconHome2 
                  color={theme.colors.indigo[9]}
                />
                <Text 
                  transform='uppercase'
                  weight={700}
                  color='black'
                >
                  Home
                </Text>
              </Group>
            </Link>
            <Link
              to='/register'
            >
              <Group 
                spacing={5} 
              >
                <IconHome2 
                  color={theme.colors.indigo[9]}
                />
                <Text 
                  transform='uppercase'
                  weight={700}
                  color='black'
                >
                  Register
                </Text>
              </Group>
            </Link>            
          </Navbar.Section>

          <Navbar.Section>
            <Link
              to='/login'
            >
            <Group 
              spacing={5} 
            >
              <IconLogin 
                color={theme.colors.indigo[9]}
              />
              <Text 
                transform='uppercase'
                weight={700}
                color='black'
              >
                Login
              </Text>
            </Group>
            </Link>
          </Navbar.Section>
        </Navbar>
      }
    >
      {props.children}
    </AppShell>
  )
}

export { Navigation };
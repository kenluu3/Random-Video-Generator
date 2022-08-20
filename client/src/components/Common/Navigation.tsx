import React, { PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell, Burger, Divider, Group, Header, Navbar, Stack, Text, MediaQuery, createStyles } from '@mantine/core';
import { IconLogin, IconHome2, IconUserPlus } from '@tabler/icons';
import { Logo } from './Logo';
import { home, login, register, profile } from '../../app';

const navigationStyles = createStyles((theme) => ({
  navigationStack: {
    height: '100%',
    paddingBottom: '5%',
  },
  navigationLink: {
    textDecoration: 'none'
  },
}));

const Navigation = ({ children }: PropsWithChildren) => {
  const { classes } = navigationStyles();
  const [open, setOpen] = useState(false);

  return (
    <AppShell
      padding='md'
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[2]
        }
      })}
      header={
        <Header
          height={65}
          p='md'
        > 
          <Group
            position='apart'
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger 
                size='sm'
                opened={open}
                onClick={() => setOpen(!open)}
              />
            </MediaQuery>
            <Logo />
          </Group>
        </Header>
      }
      navbar={
        <Navbar
          hiddenBreakpoint='sm'
          hidden={!open}
          width={{ 
            base: 175,
            md: 200,
          }}
          p='md'
        >
          <Stack
            justify='space-between'
            className={classes.navigationStack}
          > 
            <Navbar.Section>
              <Link 
                to={home}
                className={classes.navigationLink}
              > 
                <Group
                > 
                  <IconHome2 />
                  <Text>Home</Text>
                </Group>
              </Link>
            </Navbar.Section>

            <Navbar.Section>
              <Divider 
                size='sm'
                p={5}
              />
              <Link 
                to={login}
                className={classes.navigationLink}
              > 
                <Group
                  spacing='xs'
                > 
                  <IconLogin />
                  <Text>Login</Text>
                </Group>
              </Link>
              <Link 
                to={register}
                className={classes.navigationLink}
              > 
                <Group
                  spacing='xs'
                > 
                  <IconUserPlus />
                  <Text>Register</Text>
                </Group>
              </Link>
            </Navbar.Section>
          </Stack>
        </Navbar>
      }
    >
     {children} 
    </AppShell>
  )
}

export { Navigation };
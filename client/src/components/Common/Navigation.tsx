import React, { PropsWithChildren, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppShell, Header, Navbar, Text, Group, Avatar } from '@mantine/core';
import { Logo } from './Logo';
import { IconHome, IconStar, IconLogout, IconLogin } from '@tabler/icons';
import { accountActions, appRoutes, useAppSelector, useAppDispatch } from '../../app';

const Navigation = ({children}: PropsWithChildren) => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleLogout = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(accountActions.accountLogout());
  }

  return (
    <AppShell
      padding='md'
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[4]
        }
      })}
      header={
        <Header height={70} p='md'>
          <Logo />
        </Header>
      }
      navbar={ 
        <Navbar width={{base: 200}} p='md'>
          <Navbar.Section>
            <Link to={appRoutes.home}>
              <Group>
                <IconHome />
                <Text>Home</Text>
              </Group>
            </Link>
            { account.loggedIn &&
              <Link to={appRoutes.home}>
                <Group>
                  <IconStar />
                  <Text>Favorites</Text>
                </Group>
              </Link>
            }
          </Navbar.Section>
  
          <Navbar.Section>
            { account.loggedIn 
              ? 
                <Group onClick={handleLogout}>
                  <IconLogout />
                  <Text>Logout</Text>
                </Group>
              :
                <Link to={appRoutes.login}>
                  <Group>
                    <IconLogin />
                    <Text>Login</Text>
                  </Group>
                </Link>
            }
          </Navbar.Section>
            { account.loggedIn &&
              <Navbar.Section>
                <Group>
                  <Avatar alt={account.username} />
                  <Text transform='uppercase'>{account.username}</Text>
                </Group>
              </Navbar.Section>
            }
        </Navbar>
      }
    >
      {children}
    </AppShell>
  )
}

export { Navigation };
import React, { PropsWithChildren, useState } from 'react';
import { AppShell, Box, Burger, Divider, Header, Navbar, MediaQuery, Group, Stack, } from '@mantine/core';
import { IconHome2, IconStar, IconLogin, IconLogout } from '@tabler/icons';
import { Logo } from './Logo';
import { ProfileCard } from './ProfileCard';
import { NavigationItem } from './NavigationItem';
import { accountActions, appRoutes, useAppDispatch, useAppSelector } from '../../app';

const Navigation = ({ children }: PropsWithChildren) => {
  const [hiddenNavbar, setHiddenNavbar] = useState(false);
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(accountActions.accountLogout());
  }
  
  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      header={
        <Header height={65} p='xs'>
          <Group>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                size='sm'
                opened={hiddenNavbar}
                onClick={() => setHiddenNavbar(!hiddenNavbar)}
                sx={{ marginRight: 'auto' }}
              />
            </MediaQuery>
            <Box sx={{ marginRight: 'auto' }}>
              <Logo />
            </Box>
          </Group>
        </Header>
      }
      navbar={
        <Navbar 
          width={{ base: 220 }}
          p='lg' hiddenBreakpoint='sm'
          hidden={!hiddenNavbar}
        >
          <Stack
            sx={{ height: '100%' }}
            justify='space-between'
          >
            <Navbar.Section>
              <NavigationItem 
                icon={<IconHome2 color={'skyblue'} size={26} />} 
                label='HOME' routeTo={appRoutes.home} 
              />
            </Navbar.Section>
            <Navbar.Section>
              { account.loggedIn &&
                <Box onClick={handleLogout}>
                  <NavigationItem
                    icon={<IconLogout color={'red'} size={26} />}
                    label='LOGOUT' routeTo={appRoutes.home}
                  />
                </Box>
              }
              <Divider mt='md' mb='md'/>
              { account.loggedIn
                ? <ProfileCard username='username' />
                : <NavigationItem
                    icon={<IconLogin color={'lightgreen'} size={26} />}
                    label='LOGIN' routeTo={appRoutes.login}
                  />
              }
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
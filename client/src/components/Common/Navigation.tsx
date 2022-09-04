import React, { PropsWithChildren, useState } from 'react';
import { AppShell, Burger, Divider, Header, Group, Navbar, MediaQuery, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconHome2, IconStar, IconLogin, IconLogout, IconUser } from '@tabler/icons';
import { Logo } from './Logo';
import { ProfileCard } from './ProfileCard';
import { NavigationItem } from './NavigationItem';
import { accountActions, appRoutes, useAppDispatch, useAppSelector } from '../../app';

const Navigation = ({ children }: PropsWithChildren) => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [showNav, setShowNav] = useState(false);

  const logout = async () => {
    const response = await dispatch(accountActions.accountLogout());
    showNotification({ message: response.payload.message, autoClose: 2000 });
  }

  const toggleNav = () => setShowNav(!showNav);

  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      header={
        <Header height={65} p='xs'>
          <Group spacing={0} position='apart'>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger size='sm' opened={showNav} onClick={toggleNav} />
            </MediaQuery>
            <Logo />
          </Group>
        </Header>
      }
      navbar={
        <Navbar width={{ base: 200 }} hiddenBreakpoint='sm' hidden={!showNav} p='xl'>
          <Stack justify='space-between' sx={{ height: '100%' }}>
            <Stack>
              <NavigationItem icon={<IconHome2 size={26} color={'black'} />} label='HOME' routeTo={appRoutes.home} />
              { account.loggedIn && <NavigationItem icon={<IconStar color={'black'} size={26} />} label='FAVORITES' routeTo={appRoutes.favorites.replace(':username', account.username)} /> }
              { account.loggedIn && <NavigationItem icon={<IconUser color={'black'} size={26} />} label='PROFILE' routeTo={appRoutes.user} />}
            </Stack>
            <Stack>
              { account.loggedIn &&
                <div onClick={logout}>
                  <NavigationItem icon={<IconLogout color={'black'} size={26} />} label='LOGOUT' routeTo={appRoutes.home} />
                </div>
              }
              <Divider />
              { !account.loggedIn && <NavigationItem icon={<IconLogin size={26} color={'black'} />} label='LOGIN' routeTo={appRoutes.login} /> }
              { account.loggedIn && <ProfileCard username={account.username} />}
            </Stack>
          </Stack>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  )
}

export { Navigation };
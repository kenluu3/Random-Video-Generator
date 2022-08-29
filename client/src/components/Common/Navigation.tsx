import React, { KeyboardEvent, PropsWithChildren, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell, Box, Burger, Divider, Header, Navbar, MediaQuery, Group, Stack, TextInput, Switch } from '@mantine/core';
import { IconHome2, IconStar, IconLogin, IconLogout, IconUser, IconSearch } from '@tabler/icons';
import { Logo } from './Logo';
import { ProfileCard } from './ProfileCard';
import { NavigationItem } from './NavigationItem';
import { accountActions, appRoutes, useAppDispatch, useAppSelector } from '../../app';

const Navigation = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [hiddenNavbar, setHiddenNavbar] = useState(false);
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(accountActions.accountLogout());
  }

  const handleSearchInputChange = (event: SyntheticEvent) => {
    setSearchInput((event.target as HTMLInputElement).value);
  }

  const handleSearch = (event: KeyboardEvent) => {
    if (searchInput && event.key === 'Enter') {
      if (searchInput.length >= 5 && searchInput.length <= 25) {
        setSearchInput('');
        navigate(appRoutes.favorites.replace(':username', searchInput.toLowerCase()));
      }
    }
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
            <TextInput 
              icon={<IconSearch />}
              placeholder='Search user'
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearch}
            />
          </Group>
        </Header>
      }
      navbar={
        <Navbar 
          width={{ base: 200 }}
          p='lg' hiddenBreakpoint='sm'
          hidden={!hiddenNavbar}
        >
          <Stack
            sx={{ height: '100%' }}
            justify='space-between'
          >
            <Navbar.Section>
              <Stack
                spacing='xs'
              >
                <NavigationItem 
                  icon={<IconHome2 color={'skyblue'} size={26} />} 
                  label='HOME' routeTo={appRoutes.home} 
                />
                { account.loggedIn &&
                  <NavigationItem
                    icon={<IconStar color={'gold'} size={26} />}
                    label='FAVORITES' routeTo={appRoutes.favorites.replace(':username', account.username)}
                  />
                }
                { account.loggedIn &&
                  <NavigationItem 
                    icon={<IconUser color={'lightblue'} size={26} />}
                    label='PROFILE' routeTo={appRoutes.user.replace(':username', account.username)}
                  />
                }
              </Stack>
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
                ? <ProfileCard username={account.username} />
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
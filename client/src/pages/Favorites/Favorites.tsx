import React, { useState, useEffect } from 'react';
import { Stack, Divider, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { FavoriteTable, Navigation } from '../../components';
import { appRoutes, useAppSelector, favoriteAPI } from '../../app';

const Favorites = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [favorites, setFavorites] = useState<any>([]);
  const account = useAppSelector((state) => state.account);
  const viewSelf = account.loggedIn && username?.toLowerCase() === account.username;

  useEffect(() => {
    if (username) {
      favoriteAPI.get(username)
        .then((values) => setFavorites(values.data))
        .catch(() => navigate(appRoutes.home));
    } else {
      navigate(appRoutes.home)
    }
  }, [username, favorites])

  return (
    <Navigation>
      <Stack p={80}>
        <Text size={32} weight={700} transform='uppercase'>
          {username} Favorites
        </Text>
        <Divider size='sm' />
        <FavoriteTable favorites={favorites} viewSelf={viewSelf} />
      </Stack>
    </Navigation>
  )
}

export { Favorites };
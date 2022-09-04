import React, { useEffect, useState } from 'react';
import { Stack, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { FavoriteTable, Navigation } from '../../components';
import { appRoutes, favoriteAPI, useAppSelector } from '../../app';
import '../../styles/page.scss';

const Favorites = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const account = useAppSelector((state) => state.account);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (username) {
      favoriteAPI.get(username)
        .then((values) => setFavorites(values.data))
        .catch(() => navigate(appRoutes.error))
    }
  }, [favorites])

  return (
    <Navigation>
      <div className='main-container'>
        <Stack>
          <Title order={1}>{username?.toUpperCase()} FAVORITES LIST</Title>
          <FavoriteTable favorites={favorites} selfView={account.username === username?.toLowerCase()} />
        </Stack>
      </div>
    </Navigation>
  )
}

export { Favorites };
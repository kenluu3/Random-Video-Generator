import React, { useEffect, useState } from 'react';
import { LoadingOverlay, Stack, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { FavoriteTable, Navigation } from '../../components';
import { appRoutes, favoritesActions, useAppDispatch, useAppSelector } from '../../app';
import '../../styles/page.scss';

const Favorites = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      setTimeout(() => {
        dispatch(favoritesActions.retrieveFavorites(username)).unwrap()
        .then(() => setLoading(!loading))
        .catch(() => navigate(appRoutes.error));
      }, 100)
    }
  }, [username])

  return (
    <>
      <LoadingOverlay visible={loading} overlayBlur={3} />
      <Navigation>
        <div className='main-container'>
          <Stack>
            <Title order={1}>{username?.toUpperCase()} FAVORITES LIST</Title>
            <FavoriteTable selfView={account.username === username?.toLowerCase()} />
          </Stack>
        </div>
      </Navigation>
    </>
  )
}

export { Favorites };
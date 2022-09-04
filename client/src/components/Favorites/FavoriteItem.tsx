import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, CloseButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { appRoutes, accountActions, favoriteAPI, useAppDispatch } from '../../app';

interface FavoriteItemProps {
  id: string,
  title: string,
  channel: string,
  channelId: string,
  date: string,
  selfView: boolean
}

const FavoriteItem = ({ id, title, channel, channelId, date, selfView }: FavoriteItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const remove = async () => {
    try {
      await favoriteAPI.remove(id);
    } catch (error: any) {
      if (error.response.status === 401) {
        showNotification({ message: error.response.data, autoClose: 2000 });
        dispatch(accountActions.accountReset());
        navigate(appRoutes.login);
      } else {
        showNotification({ message: 'Server error, failed to remove from favorites', autoClose: 2000 });
      }
    }
  }
  
  return (
    <tr>
      <td>
        <Anchor href={`https://www.youtube.com/watch?v=${id}`}>
          {title}
        </Anchor>
      </td>
      <td>
        <Anchor href={`https://www.youtube.com/channel/${channelId}`}>
          {channel}
        </Anchor>
      </td>
      <td>
        {date}
      </td>
      { selfView && <td><CloseButton onClick={remove} /></td> }
    </tr>
  )
}

export type { FavoriteItemProps };
export { FavoriteItem };
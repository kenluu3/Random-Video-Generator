import React, { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, CloseButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { appRoutes, accountActions, useAppDispatch, favoritesActions } from '../../app';

interface FavoriteItemProps {
  id: string,
  title: string,
  channel: string,
  channelId: string,
  date: string,
  selfView: boolean,
}

const FavoriteItem = ({ id, title, channel, channelId, date, selfView }: FavoriteItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const remove = async () => {
    const response = await dispatch(favoritesActions.removeFavorite(id));

    if (favoritesActions.removeFavorite.rejected.match(response)) {
      const error = response.payload as string;
      
      showNotification({ message: error, autoClose: 2000 });
      if (error === 'Unauthorized') {
        dispatch(accountActions.accountReset());
        navigate(appRoutes.login);
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
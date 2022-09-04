import React from 'react';
import { Anchor, CloseButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { favoriteAPI } from '../../app';

interface FavoriteItemProps {
  id: string,
  title: string,
  channel: string,
  channelId: string,
  date: string,
  selfView: boolean
}

const FavoriteItem = ({ id, title, channel, channelId, date, selfView }: FavoriteItemProps) => {
  const remove = async () => {
    try {
      await favoriteAPI.remove(id);
    } catch (error: any) {
      showNotification({ message: 'Server error, failed to remove from favorites', autoClose: 2000 });
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
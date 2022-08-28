import React from 'react';
import { Anchor, CloseButton } from '@mantine/core';
import { favoriteAPI } from '../../app';

interface FavoriteItemProps {
  id: string,
  title: string,
  channel: string,
  channelId: string,
  date: string,
  viewSelf: boolean
}

const FavoriteItem = ({ id, title, channel, channelId, date, viewSelf }: FavoriteItemProps) => {
  const handleRemoveFavorite = async () => {
    try {
      const response = await favoriteAPI.remove(id);
    } catch (error: any) {
      console.log(error);
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
      { viewSelf && 
        <td>
          <CloseButton onClick={handleRemoveFavorite} />
        </td>
      }
    </tr>
  )
}

export type { FavoriteItemProps };
export { FavoriteItem };
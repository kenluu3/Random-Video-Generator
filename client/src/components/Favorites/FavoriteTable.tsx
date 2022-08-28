import React from 'react';
import { Table, Text, Paper } from '@mantine/core';
import { FavoriteItem } from './FavoriteItem';

interface FavoriteTableProps {
  favorites: any[],
  viewSelf: boolean,
}

const FavoriteTable = ({ favorites, viewSelf }: FavoriteTableProps) => {
  return (
    <Paper p='md'>
      <Table highlightOnHover horizontalSpacing='md'>
        <thead>
          <tr>
            <td>
              <Text weight={700} size={20}>TITLE</Text>
            </td>
            <td>
              <Text weight={700} size={20}>CHANNEL</Text>
            </td>
            <td>
              <Text weight={700} size={20}>DATE</Text>
            </td>
          </tr>
        </thead>
        <tbody>
          {favorites.map(({ id, title, channel, channelId, saveDate }, i) => 
            <FavoriteItem 
              key={i}
              id={id} title={title}
              channel={channel} channelId={channelId}
              date={saveDate}
              viewSelf={viewSelf}
            />
          )}
        </tbody>
      </Table>
    </Paper>
  )
}

export type { FavoriteTableProps };
export { FavoriteTable };
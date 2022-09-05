import React from 'react';
import { Table, Text, Paper } from '@mantine/core';
import { FavoriteItem } from './FavoriteItem';
import { useAppSelector } from '../../app';

interface FavoriteTableProps {
  selfView: boolean
}

const FavoriteTable = ({ selfView }: FavoriteTableProps) => {
  const favorites = useAppSelector((state) => state.favorites);
  const favoriteItems = favorites.map(({ id, title, channel, channelId, saveDate }) => 
    <FavoriteItem key={id} id={id} title={title} channel={channel} channelId={channelId} date={saveDate} selfView={selfView} />
  )

  return (
    <Paper>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <Text>TITLE</Text>
            </th>
            <th>
              <Text>CHANNEL</Text>
            </th>
            <th>
              <Text>SAVE DATE</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {favoriteItems}
        </tbody>
      </Table>
    </Paper>
  )
}

export type { FavoriteTableProps };
export { FavoriteTable };
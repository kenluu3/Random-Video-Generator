import React from 'react';
import { Table, Text, Paper } from '@mantine/core';
import { FavoriteItem } from './FavoriteItem';

interface FavoriteTableProps {
  favorites: any[],
  selfView: boolean,
}

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const FavoriteTable = ({ favorites, selfView }: FavoriteTableProps) => {
  const favoriteItems = favorites.map(({ id, title, channel, channelId, saveDate }, i) => 
    <FavoriteItem key={i} id={id} title={title} channel={channel} channelId={channelId} date={saveDate} selfView={selfView} />
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
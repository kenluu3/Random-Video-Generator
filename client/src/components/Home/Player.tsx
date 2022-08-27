import React, { SyntheticEvent } from 'react';
import { AspectRatio, Box, Paper, Group, Text, Button, Divider  } from '@mantine/core';
import { useAppSelector, favoriteAPI } from '../../app';

const Player = () => {
  const account = useAppSelector((state) => state.account);
  const video = useAppSelector((state) => state.video);

  const handleAddFavorite = async (event: SyntheticEvent) => {
    event.preventDefault();
  }

  return (
    <Box>
      <AspectRatio ratio={16/9}>
        <Paper>
          <iframe 
            style={{
              width: '100%', 
              height: '100%'
            }}
            frameBorder={0}
            src={`https://www.youtube.com/embed/${video.id}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Paper>
      </AspectRatio>
      <Group position='apart'>
        <Text>{video.title}</Text>
        { account.loggedIn &&
          <Button onClick={handleAddFavorite}>Add to Favorites</Button>
        } 
      </Group>
      <Divider color={'white'} />
      <Box>
        <Text>
          <a href={`https://www.youtube.com/channel/${video.channelID}`}>{video.channel}</a>
        </Text>
        <Text>
          {video.description}
        </Text>
      </Box>
    </Box>
  )
}

export { Player };
import React, { useEffect } from 'react';
import { Group, Box, Button, Stack } from '@mantine/core';
import { Navigation, Player, TagsContainer } from '../../components';
import { IconPlayerPlay } from '@tabler/icons';
import { videoActions, useAppDispatch, useAppSelector } from '../../app';

const Home = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags);

  const handleGenerate = () => {
    dispatch(videoActions.retrieveVideo(tags));
  }

  useEffect(() => {
    dispatch(videoActions.retrieveVideo(tags));
  })

  return (
    <Navigation>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',

          '@media (max-width: 768px)': {
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }
        }}
      >
        <Box
          sx={{
            width: '70%',

            '@media (max-width: 768px)': {
              width: '100%',
              marginBottom: '12px',
            }
          }}
        >
          <Player />
        </Box>
        <Stack
          sx={{
            width: '29%',

            '@media (max-width: 768px)': {
              width: '100%',
            }
          }}
        >
          <Button
            rightIcon={<IconPlayerPlay stroke={1} />}
            onClick={handleGenerate}
          >
            Generate Video
          </Button>
          <TagsContainer />
        </Stack>
      </Box>
    </Navigation>
  )
}

export { Home };
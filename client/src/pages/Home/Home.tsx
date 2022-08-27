import React, { useEffect, SyntheticEvent } from 'react';
import { Button, Stack } from '@mantine/core';
import { Navigation, Player, TagsContainer } from '../../components';
import { videoActions,useAppDispatch, useAppSelector } from '../../app';

const Home = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(videoActions.retrieveVideo(tags));
  })

  const handleGenerate = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(videoActions.retrieveVideo(tags));
  }

  return (
    <Navigation>
      <Player />
      <Stack>
        <Button onClick={handleGenerate}>Generate Video</Button>
        <TagsContainer />
      </Stack>
    </Navigation>
  )
}

export { Home };
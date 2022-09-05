import React, { useEffect, useState } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { useAppDispatch, useAppSelector, videoActions } from '../../app';
import { Navigation, Player, TagsContainer } from '../../components';
import '../../styles/page.scss';

const Home = () => {
  const video = useAppSelector((state) => state.video);
  const tags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (!video.id) dispatch(videoActions.retrieveVideo(tags));
      setLoading(!loading);      
    }, 100)
  }, [])

  return (
    <>
    <LoadingOverlay visible={loading} overlayBlur={3} />
    <Navigation>
      <div className='main-container-home'>
        <div className='player-container'>
          <Player />
        </div>
        <div className='tags-container'>
          <TagsContainer />
        </div>
      </div>
    </Navigation>
    </>
  )
}

export { Home };
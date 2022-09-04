import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector, videoActions } from '../../app';
import { Navigation, Player, TagsContainer } from '../../components';
import '../../styles/page.scss';

const Home = () => {
  const video = useAppSelector((state) => state.video);
  const tags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!video.id) dispatch(videoActions.retrieveVideo(tags));
  }, [])

  return (
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
  )
}

export { Home };
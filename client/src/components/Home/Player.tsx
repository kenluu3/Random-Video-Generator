import React from 'react';
import { AspectRatio, Paper, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  playerContainer: {
    width: '1280px',
    height: '730px',
  },
}));

const Player = () => {
  const { classes } = useStyles();

  return (
    <Paper
      p='sm'
      withBorder
      className={classes.playerContainer}
    >
      <AspectRatio 
        ratio={ 16 / 9 }
      >
        <iframe
          src="https://www.youtube.com/embed/Dorf8i6lCuk"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title='Video Player'
          allowFullScreen
        />
      </AspectRatio>
    </Paper>
  )
}

export { Player };
import React, { useState } from 'react';
import { AspectRatio, Button, Paper, createStyles } from '@mantine/core';
import { getVideo } from '../../app';

const useStyles = createStyles((theme) => ({
  playerContainer: {
    width: '69%',
  },
  playerFrame: {
    width: '100%',
    height: '100%',
  }
}));

const Player = () => {
  const { classes } = useStyles();

  return (
    <AspectRatio
      ratio={ 16/9 }
      className={classes.playerContainer}
    >
      <Paper
        p='sm'
        withBorder
      >
        <iframe
          className={classes.playerFrame}
          src={'https://www.youtube.com/embed/cdhwvAq_1Xw'}
          frameBorder={0}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          title='YouTube Video Player'
          allowFullScreen
        />
      </Paper>
    </AspectRatio>
  )
}

export { Player };
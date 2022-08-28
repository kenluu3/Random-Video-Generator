import React from 'react';
import { Accordion, Anchor, AspectRatio, Button, Center, Divider, Paper, Stack, Text } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import { useAppSelector, favoriteAPI } from '../../app';

const Player = () => {
  const account = useAppSelector((state) => state.account);
  const video = useAppSelector((state) => state.video);

  const handleAddFavorite = async () => {
    try {
      if (video) {
        const result = await favoriteAPI.add({
          id: video.id,
          title: video.title,
          channel: video.channel,
          channelId: video.channelId,
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Stack sx={{ height: '100%', width: '100%' }}>
      <AspectRatio ratio={16/9}>
        <Paper p='sm'>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            style={{ width: '100%', height: '100%' }}
            frameBorder={0}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Paper>
      </AspectRatio>
      { account.loggedIn &&
        <Center>
          <Button
            variant='subtle'
            rightIcon={<IconStar color={'gold'} fill={'gold'} stroke={1} />}
            onClick={handleAddFavorite}
          >
            Add To Favorites
          </Button>
        </Center>
      }
      <Divider size='sm' />
      <Accordion
        variant='filled'
      >
        <Accordion.Item value='title'>
          <Accordion.Control>
            <Text weight={700}>
              {video.title}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Divider mt='xs' mb='xs' />
            <Text weight={700}>
              <Anchor href={`https://www.youtube.com/c/${video.channelID}`}>
                {video.channel}
              </Anchor>
            </Text>
            <Text>
              {video.description}
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  )
}

export { Player };
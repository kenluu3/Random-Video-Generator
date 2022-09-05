import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, AspectRatio, Button, Card, Divider, Group, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconStar } from '@tabler/icons';
import { appRoutes, useAppDispatch, useAppSelector, favoriteAPI, accountActions } from '../../app';

const Player = () => {
  const account = useAppSelector((state) => state.account);
  const video = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const htmlDecode = (input: string) => {
    let doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  }

  const saveFavorite = async (event: SyntheticEvent) => {
    event.stopPropagation();

    try {
      if (video) {
        const response = await favoriteAPI.add({ id: video.id, title: video.title, channel: video.channel, channelId: video.channelId });
        showNotification({ message: response.data.message, autoClose: 2000 });
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        showNotification({ message: error.response.data, autoClose: 2000 });
        dispatch(accountActions.accountReset());
        navigate(appRoutes.login);
      } else {
        showNotification({ message: error.response.data.message, autoClose: 2000 });
      }
    }
  }

  return (
    <Card p='xs'>
      <AspectRatio ratio={16/9}>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder={0}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </AspectRatio>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={700}>{htmlDecode(video.title)}</Text>
        { account.loggedIn &&
          <Button
            leftIcon={<IconStar />}
            onClick={saveFavorite}
            variant='subtle'
            compact
          >
            Add to Favorites
          </Button>
        }
      </Group>
      <Divider mb='sm' mt='sm' />
      <Anchor href={`https://www.youtube.com/channel/${video.channelId}`}>
        <Text weight={500}>
          {htmlDecode(video.channel)}
        </Text>
      </Anchor>
      <Text size='sm' color='dimmed'>
        {htmlDecode(video.description)}
      </Text>
    </Card>
  )
}

export { Player };
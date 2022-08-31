import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Button, Stack, Text, Title } from '@mantine/core';
import { appRoutes } from '../../app';

import '../../styles/base-page.scss';

const Error = () => {
  const navigate = useNavigate();
  const handleReturn = () => navigate(appRoutes.home);

  return (
    <div className='page-container'>
      <Stack justify='space-between' align='center'>
        <Title order={1} align='center'>
          404 - PAGE NOT FOUND
        </Title>
        <Text>
          The page you are looking for may have been removed or is temporarily unavailable.
        </Text>
        <Button radius='xl' onClick={handleReturn} >
          Return to Homepage
        </Button>
      </Stack>
    </div>
  )
}

export { Error };
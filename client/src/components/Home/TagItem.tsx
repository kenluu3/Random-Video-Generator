import React, { SyntheticEvent } from 'react';
import { Button } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { tagsActions, useAppDispatch } from '../../app';

const TagItem = (props: any) => {
  const dispatch = useAppDispatch();

  const handleRemoveTag = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(tagsActions.removeTag(props.id));
  }

  return (
    <Button rightIcon={<IconX />}
      onClick={handleRemoveTag}
    >
      {props.label}
    </Button>
  )
}

export { TagItem }
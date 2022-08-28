import React from 'react';
import { Button } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { tagsActions, useAppDispatch } from '../../app';

interface TagItemProps {
  id: number,
  label: string
}

const TagItem = ({ id, label }: TagItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveTag = () => {
    dispatch(tagsActions.removeTag(id));
  }

  return (
    <Button
      m={5}
      variant='outline'
      rightIcon={<IconX size={18} color={'red'} />}
      onClick={handleRemoveTag}
    >
      {label}
    </Button>
  )
}

export type { TagItemProps };
export { TagItem };
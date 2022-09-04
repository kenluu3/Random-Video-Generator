import React from 'react';
import { CloseButton, Group, Text } from '@mantine/core';
import { tagsActions, useAppDispatch } from '../../app';
import '../../styles/tags.scss';

interface TagItemProps {
  id: number,
  label: string
}

const TagItem = ({ id, label }: TagItemProps) => {
  const dispatch = useAppDispatch();

  const remove = () => dispatch(tagsActions.removeTag(id));

  return (
    <Group spacing={0} className='tag-item'>
      <Text>{label}</Text>
      <CloseButton onClick={remove}/>
    </Group>
  )
}

export type { TagItemProps };
export { TagItem };
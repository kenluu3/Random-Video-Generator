import React, { SyntheticEvent, KeyboardEvent, useState } from 'react';
import { Box, Button, Group, Stack, TextInput } from '@mantine/core';
import { tagsActions, useAppDispatch, useAppSelector } from '../../app';
import { IconPlus, IconClearAll, IconFilter } from '@tabler/icons';
import { TagItem } from './TagItem';

const TagsContainer = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags);
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (event: SyntheticEvent) => {
    setTagInput((event.target as HTMLInputElement).value);
  }

  const handleTagSubmit = (event: KeyboardEvent) => {
    if (tagInput && event.key === 'Enter') {
      dispatch(tagsActions.addTag(tagInput));
      setTagInput('');
    }
  }

  const handleTagAdd = () => {
    if (tagInput) {
      dispatch(tagsActions.addTag(tagInput));
      setTagInput('');
    }
  }

  const handleClearTag = () => {
    dispatch(tagsActions.clearTags());
  }

  return (
    <Stack spacing='xs'>
      <TextInput
        icon={<IconFilter />}
        value={tagInput}
        variant='filled'
        placeholder='Add tags to narrow results'
        onChange={handleTagInputChange}
        onKeyDown={handleTagSubmit}
      />
      <Group position='apart'>
        <Button
          rightIcon={<IconClearAll stroke={1} />}
          variant='subtle'
          onClick={handleClearTag}
        >
          Clear
        </Button>
        <Button
          rightIcon={<IconPlus stroke={1} />}
          variant='subtle'
          onClick={handleTagAdd}
        >
          Add
        </Button>
      </Group>
      <Box>
        {tags.map((label, i) => <TagItem key={i} id={i} label={label} />)}
      </Box>
    </Stack>
  )
}

export { TagsContainer };
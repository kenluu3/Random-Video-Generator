import React, { KeyboardEvent, SyntheticEvent, useState } from 'react';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { IconPlayerPlay, IconPlus, IconClearAll, IconFilter } from '@tabler/icons';
import { TagItem } from './TagItem';
import { tagsActions, useAppDispatch, useAppSelector, videoActions } from '../../app';

const TagsContainer = () => {
  const tags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  const [tagInput, setTagInput] = useState('');

  const tagChange = (event: SyntheticEvent<HTMLInputElement>) => setTagInput(event.currentTarget.value);

  const tagKeyboardSubmit = (event: KeyboardEvent) => {
    if (event.key === 'Enter') tagSave();
  }

  const tagSave = () => {
    if (tagInput) {
      dispatch(tagsActions.addTag(tagInput))
      setTagInput('');
    }
  }

  const tagsClear = () => dispatch(tagsActions.clearTags());

  const tagItems = tags.map((label, i) => <TagItem key={i} id={i} label={label} />);

  const playVideo = () => dispatch(videoActions.retrieveVideo(tags));
  
  return (
    <Stack spacing={5} sx={{ width: '100%', height: '100%' }}>
      <Button leftIcon={<IconPlayerPlay size={18} />} onClick={playVideo}>
        Generate Video
      </Button>
      <TextInput
        icon={<IconFilter />}
        placeholder='Add tags to narrow results'
        value={tagInput}
        onChange={tagChange}
        onKeyDown={tagKeyboardSubmit}
      />
      <Group position='apart'>
        <Button
          variant='subtle'
          onClick={tagsClear}
          leftIcon={<IconClearAll size={18} />}
          compact
        >
          Clear
        </Button>
        <Button
          variant='subtle'
          onClick={tagSave}
          leftIcon={<IconPlus size={18} />}
          compact
        >
          Add
        </Button>
      </Group>
      <div className='tag-container'>{tagItems}</div>
    </Stack>
  )
}

export { TagsContainer };
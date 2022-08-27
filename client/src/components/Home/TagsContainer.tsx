import React, { SyntheticEvent, useState } from 'react';
import { Box, Button, Stack, TextInput } from '@mantine/core';
import { tagsActions, useAppSelector, useAppDispatch } from '../../app';
import { TagItem } from './TagItem';

const TagsContainer = () => {
  const [tagInput, setTagInput] = useState('');
  const tags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const tagsListComponent = tags.map((tag, i) => <TagItem key={i} id={i} label={tag} />)

  const handleTagInputChange = (event: SyntheticEvent) => {
    setTagInput((event.target as HTMLInputElement).value);
  }
  
  const handleSubmitTag = (event: any) => {
    if (event.key === 'Enter' && tagInput) {
      dispatch(tagsActions.addTag(tagInput));
      setTagInput('');
    }
  }

  const handleAddTag = (event: SyntheticEvent) => {
    event.preventDefault();

    if (tagInput) {
      dispatch(tagsActions.addTag(tagInput));
      setTagInput('');
    }
  }

  const handleClearTag = (event: SyntheticEvent) => {
    event.preventDefault();

    dispatch(tagsActions.clearTags());
  }

  return (
    <Stack>
      <TextInput 
        variant='filled' 
        value={tagInput}
        placeholder='Add tags to narrow randomized result'
        onChange={handleTagInputChange}
        onKeyDown={handleSubmitTag}
      />
      <Button onClick={handleAddTag}>Add</Button>
      <Button onClick={handleClearTag}>Clear</Button>
      <Box>
        {tagsListComponent}
      </Box>
    </Stack>
  )

}

export { TagsContainer };
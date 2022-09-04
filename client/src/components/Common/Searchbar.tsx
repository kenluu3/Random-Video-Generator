import React, { KeyboardEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import '../../styles/search.scss';
import { appRoutes } from '../../app';

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const searchInputChange = (event: SyntheticEvent<HTMLInputElement>) => setSearchInput(event.currentTarget.value);

  const searchSubmit = (event: KeyboardEvent) => {
    if (event.key === 'Enter') search();
  }

  const search = () => {
    if (searchInput) {
      navigate(appRoutes.favorites.replace(':username', searchInput))
      setSearchInput(''); 
    }
  }

  return (
    <div className='search-bar'>
      <TextInput
        className='search-bar-input'
        placeholder='Search user ...'
        radius='xl'
        value={searchInput}
        onChange={searchInputChange}
        onKeyDown={searchSubmit}
      />
      <ActionIcon
        className='search-bar-icon'
        radius='xl'
        onClick={search}
      >
        <IconSearch size={18} />
      </ActionIcon>
    </div>
  )
}

export { Searchbar };
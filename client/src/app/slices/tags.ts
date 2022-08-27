import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      return [...state, action.payload]
    },
    removeTag: (state, action) => {
      return state.filter((tag, i) => i !== action.payload);
    },
    clearTags: () => {
      return []
    }
  }
})

export const tagsReducer = tagsSlice.reducer;
export const tagsActions = tagsSlice.actions;
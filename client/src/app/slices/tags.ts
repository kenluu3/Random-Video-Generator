import { createSlice } from '@reduxjs/toolkit';

const initialState = new Array<string>;

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      [...state, action.payload]
    },
    removeTag: (state, action) => {
      state.splice(action.payload, 1)
    },
    clearTags: () => {
      return []
    }
  }
})

export const tagsReducer = tagsSlice.reducer;
export const tagsActions = tagsSlice.actions;
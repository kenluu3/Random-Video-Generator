import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = []

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeTag: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    clearTags: () => {
      return []
    }
  }
})

const tagsReducer = tagsSlice.reducer;
const { addTag, removeTag, clearTags } = tagsSlice.actions;

export { tagsReducer, addTag, removeTag, clearTags };
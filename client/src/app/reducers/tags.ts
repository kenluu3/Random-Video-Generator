import { createSlice } from '@reduxjs/toolkit';

const initialState: any[] = []

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    tagsAdd(state, action) {
      return [...state, action.payload]
    },
    tagsRemove(state, action) {
      return state.filter(tag => tag.id !== action.payload.id)
    },
    tagsClear(state, action) {
      return []
    }
  }
})

export { tagsSlice };
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { videoAPI } from '../api';

const initialState = {
  id: '',
  title: '',
  description: '',
  channel: '',
  channelID: ''
}

const retrieveVideo = createAsyncThunk(
  'video/retrieveVideo',
  async (payload: string[]) => {
    const response = await videoAPI.get(payload);
    return response.data;
  }
)

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveVideo.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})

export const videoReducer = videoSlice.reducer;
export const videoActions = { ...videoSlice.actions, retrieveVideo };
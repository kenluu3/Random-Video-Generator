import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { favoriteAPI } from '../api';

interface Favorite {
  id: string,
  title: string,
  channel: string,
  channelId: string,
  saveDate: string,
}

const initialState: Favorite[] = [];

const retrieveFavorites = createAsyncThunk(
  'favorites/retrieveFavorites',
  async (payload: string) => {
    const response = await favoriteAPI.get(payload);
    return response.data;
  }
)

const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await favoriteAPI.remove(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveFavorites.fulfilled, (state, action) => {
      return action.payload;
    }),
    builder.addCase(removeFavorite.fulfilled, (state, action) => {
      return state.filter((value) => value.id !== action.payload.id);
    })
  },
})

export const favoritesReducer = favoritesSlice.reducer;
export const favoritesActions = { ...favoritesSlice.actions, retrieveFavorites, removeFavorite };
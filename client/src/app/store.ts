import { configureStore } from '@reduxjs/toolkit';
import { tagsReducer } from './slices';

const store = configureStore({
  reducer: {
    tags: tagsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
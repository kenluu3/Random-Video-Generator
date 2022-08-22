import { configureStore } from '@reduxjs/toolkit';
import { tagsSlice, accountSlice } from './reducers';

const store = configureStore({
  reducer: {
    tags: tagsSlice.reducer,
    account: accountSlice.reducer
  }
})

export { store };
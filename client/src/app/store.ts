import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { accountReducer, favoritesReducer, tagsReducer, videoReducer } from './slices';

const store = configureStore({
  reducer: {
    account: accountReducer,
    favorites: favoritesReducer,
    tags: tagsReducer,
    video: videoReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accountAPI } from '../api';

const initialState = {
  loading: false,
  loggedIn: false,
  username: '',
}

const accountLogin = createAsyncThunk(
  'account/accountLogin',
  async (payload: any) => {
    const response = await accountAPI.login(payload);
    return response.data;
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountLogout: () => {
      return {loading: false, loggedIn: false, username: ''}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(accountLogin.pending, (state) => {
      return {...state, loading: true };
    }),
    builder.addCase(accountLogin.fulfilled, (state, action) => {
      return {...state, loggedIn: true, username: action.payload.username};
    }),
    builder.addCase(accountLogin.rejected, () => {
      return initialState;
    })
  }
})

export const accountReducer = accountSlice.reducer;
export const accountActions = { ...accountSlice.actions, accountLogin };
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accountAPI } from '../api';

const initialState = {
  loading: false,
  loggedIn: false,
  username: '',
  email: '',
  active: false,
  registerDate: '',
}

const accountLogin = createAsyncThunk(
  'account/accountLogin',
  async (payload: any) => {
    const response = await accountAPI.login(payload);
    return response.data;
  }
)

const accountUpdate = createAsyncThunk(
  'account/accountUpdate',
  async (payload: any, { rejectWithValue }) => { 
    try {
      const response = await accountAPI.update(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const accountLogout = createAsyncThunk(
  'account/accountLogout',
  async () => {
    const response = await accountAPI.logout();
    return response.data;
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountReset: (state) => {
      return {...state, loading: false, loggedIn: false, username: '', email: '', active: false, registerDate: ''};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(accountLogin.pending, (state) => {
      return {...state, loading: true };
    }),
    builder.addCase(accountLogin.fulfilled, (state, action) => {
      const { username, email, active, createDate } = action.payload.user;
      return {...state, loading: false, loggedIn: true, username: username, email: email, active: active, registerDate: createDate };
    }),
    builder.addCase(accountLogin.rejected, () => {
      return initialState;
    }),
    builder.addCase(accountUpdate.fulfilled, (state, action) => {
      const { username, email } = action.payload.user;
      return {...state, username: username, email: email };
    }),
    builder.addCase(accountLogout.fulfilled, (state, action) => {
      return {...state, loading: false, loggedIn: false, username: '', email: '', active: false, registerDate: ''};
    })
  }
})

export const accountReducer = accountSlice.reducer;
export const accountActions = { ...accountSlice.actions, accountLogin, accountUpdate, accountLogout };
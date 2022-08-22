import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginAccount } from '../api';

const initialState = {
  loggedIn: false,
  username: '',
}

const accountLogin = createAsyncThunk(
  'account/accountLogin',
  async (payload: Object, thunkAPI) => {
    const response = await loginAccount(payload);
    return response.data;
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountLogout(state, action) {
      return {...initialState}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(accountLogin.fulfilled, (state, action) => {
      return {loggedIn: true, username: action.payload}
    })
  },
})

export { accountSlice };
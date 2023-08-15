import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import {
  logOutUserThunk,
  loginUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from './operations';

const authState = {
  isLoading: false,
  error: null,
  userData: null,
  token: null,
  authentificated: false,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  extraReducers: builder =>
    builder
      // ----- REGISTER -----
      .addCase(registerUserThunk.pending, handlePending)
      .addCase(registerUserThunk.rejected, handleRejected)
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })

      // ----- LOGIN -----
      .addCase(loginUserThunk.pending, handlePending)
      .addCase(loginUserThunk.rejected, handleRejected)
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })

      // ----- REFRESH -----
      .addCase(refreshUserThunk.pending, handlePending)
      .addCase(refreshUserThunk.rejected, handleRejected)
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload;
      })

      // ----- LOGOUT -----
      .addCase(logOutUserThunk.pending, handlePending)
      .addCase(logOutUserThunk.rejected, handleRejected)
      .addCase(logOutUserThunk.fulfilled, state => {
        state.isLoading = false;
        state.authentificated = false;
        state.userData = null;
        state.token = null;
      }),
});

const persistConfiAuth = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const authReducer = persistReducer(persistConfiAuth, authSlice.reducer);

export const selectUserLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectToken = state => state.auth.token;
export const selectUserData = state => state.auth.userData;
export const selectAuthentificated = state => state.auth.authentificated;

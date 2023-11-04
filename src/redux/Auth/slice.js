import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  logOutThunk,
  loginThunk,
  refreshThunk,
  registerThunk,
} from './operations';

const INITIAL_STATE = {
  token: null,
  user: {
    email: null,
    name: null,
  },
  authenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.user = action.payload;
      })
      .addCase(logOutThunk.fulfilled, () => {
        return INITIAL_STATE;
      })

      .addMatcher(
        isAnyOf(
          logOutThunk.pending,
          registerThunk.pending,
          loginThunk.pending,
          refreshThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          logOutThunk.rejected,
          registerThunk.rejected,
          loginThunk.rejected,
          refreshThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const authReducer = authSlice.reducer;

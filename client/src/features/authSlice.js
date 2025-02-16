// src/authSlice.js (si no tienes un slice de autenticación)
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken') || null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('authToken', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

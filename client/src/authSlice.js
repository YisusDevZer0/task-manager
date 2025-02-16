// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: localStorage.getItem('authToken') || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('authToken'); // Elimina el token del localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

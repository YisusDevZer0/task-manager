// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';
import authReducer from '../features/authSlice';  // Importa el authSlice

export default configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,  // Añades el authReducer aquí
  },
});

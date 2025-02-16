import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

// Obtener el token de localStorage o desde el estado global si lo tienes
const getAuthToken = () => localStorage.getItem('authToken'); // Cambia esto según donde almacenes el token

// Acción para obtener tareas
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const token = getAuthToken(); // Obtén el token
  const response = await axios.get(`${API_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`, // Añade el token en el encabezado Authorization
    },
  });
  return response.data; // La respuesta debe ser { tasks, page, totalPages, totalTasks }
});

// Acción para agregar una tarea
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const token = getAuthToken(); // Obtén el token
  const response = await axios.post(`${API_URL}/api/tasks`, task, {
    headers: {
      Authorization: `Bearer ${token}`, // Añade el token en el encabezado Authorization
    },
  });
  return response.data;
});

// Acción para editar una tarea
export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const token = getAuthToken(); // Obtén el token

  // Asegúrate de usar _id en lugar de id si es necesario
  const taskId = task._id || task.id;

  // Verifica que tienes los campos necesarios
  const updatedTask = {
    title: task.title,
    description: task.description,
    status: task.status,
  };

  const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, updatedTask, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
});

// Acción para eliminar una tarea
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  const token = getAuthToken(); // Obtén el token
  await axios.delete(`${API_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Añade el token en el encabezado Authorization
    },
  });
  return id; // Devuelve el ID de la tarea eliminada
});

// Slice de Redux
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [], // Tareas
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    page: 1, // Página actual
    totalPages: 1, // Total de páginas
    totalTasks: 0, // Total de tareas
  },
  reducers: {
    // Filtro local (opcional)
    filterTasksByStatus: (state, action) => {
      const status = action.payload;
      if (status === 'all') {
        state.items = state.items;
      } else {
        state.items = state.items.filter(task => task.status === status);
      }
    }
  },
  extraReducers: (builder) => {
    // Obtener tareas
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload.tasks; // Accede a action.payload.tasks
      state.page = action.payload.page; // Guarda la página actual
      state.totalPages = action.payload.totalPages; // Guarda el total de páginas
      state.totalTasks = action.payload.totalTasks; // Guarda el total de tareas
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Agregar tarea
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    // Editar tarea
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.items.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });

    // Eliminar tarea
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.items = state.items.filter(task => task._id !== action.payload);
    });
  }
});

// Exportar acciones y reducer
export const { filterTasksByStatus } = taskSlice.actions;
export default taskSlice.reducer;
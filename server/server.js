require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');  // Importar el router de auth
const errorMiddleware = require('./middleware/errorMiddleware');  // Importar el middleware de errores

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite solicitudes solo desde tu frontend en localhost:3000
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB ✅'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/auth', authRouter);  // Usa el router para las rutas de autenticación
app.use('/api/tasks', tasksRouter); // Agrega el router de tareas

// Middleware de manejo de errores (este debe ir al final, después de todas las rutas)
app.use(errorMiddleware);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

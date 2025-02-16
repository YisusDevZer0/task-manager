const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');  // Asegúrate de importar el middleware de autenticación
const validateTask = require('../middleware/validateTask'); // Importar el middleware de validación
const Task = require('../models/Task');

// Obtener todas las tareas (filtradas por el usuario con paginación)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await Task.find({ user: req.user.id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTasks = await Task.countDocuments({ user: req.user.id });

    console.log('Tareas obtenidas:', tasks); // Verifica los datos en el servidor

    res.json({
      tasks,
      page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
    });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

// Crear una nueva tarea
router.post('/', authMiddleware, validateTask, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Crea una nueva tarea
    const newTask = new Task({
      title,
      description,
      status: status || 'Pendiente',  // Asignar "Pendiente" si no se proporciona un estado
      user: req.user.id  // Asignar el ID del usuario desde el token
    });

    // Guardar la tarea en la base de datos
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);  // Devolver la tarea guardada
  } catch (error) {
    console.error('Error al crear tarea:', error);  // Para depurar el error
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Actualizar una tarea
router.put('/:id', authMiddleware, validateTask, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Buscar y actualizar la tarea solo si pertenece al usuario
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },  // Asegurarse de que sea la tarea del usuario
      { title, description, status },  // Campos a actualizar
      { new: true }  // Devolver el objeto actualizado
    );

    // Si no se encuentra la tarea, devolver un error 404
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada o no pertenece a este usuario' });
    }

    res.json(updatedTask);  // Devolver la tarea actualizada
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);  // Para depurar el error
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deletedTask) {
      return res.status(404).send('Tarea no encontrada');
    }

    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);  // Para depurar el error
    res.status(500).send('Error del servidor');
  }
});

// Obtener una tarea específica
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).send('Tarea no encontrada');
    }

    res.json(task);  // Devolver la tarea encontrada
  } catch (error) {
    console.error('Error al obtener la tarea:', error);  // Para depurar el error
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;

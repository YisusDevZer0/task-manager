const Task = require('./models/Task');

// Obtener todas las tareas
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('user', 'name') // Esto agrega el nombre del usuario
      .exec();
    res.json(tasks); // Devuelve la tarea con el nombre del usuario
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks };

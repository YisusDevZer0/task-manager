// middleware/validateTask.js
const validateTask = (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'El título y la descripción son requeridos.' });
    }
    next();
  };
  
  module.exports = validateTask;
  
// middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);  // Para depurar el error
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
  
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorMiddleware;
  
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extraemos el token de la cabecera Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Depuración: Verifica que el token se esté recibiendo correctamente
  console.log('Token recibido:', token);

  // Si no se proporciona el token, se deniega el acceso
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verificamos el token usando el JWT_SECRET

    // Depuración: Verifica los datos decodificados
    console.log('Datos del token decodificado:', decoded);

    // Aquí asumimos que en el payload del token está 'userId', si es diferente, ajusta esta línea
    req.user = { id: decoded.userId };  // Asignamos el ID del usuario desde el token

    // Continuamos con el siguiente middleware o la ruta
    next();
  } catch (error) {
    // Si el token no es válido o ha expirado, respondemos con error
    console.error('Error al verificar el token:', error);
    res.status(401).json({ message: 'Token no válido o expirado.' });
  }
};

module.exports = authMiddleware;

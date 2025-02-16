// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Asegúrate de importar tu modelo User

const router = express.Router();  // Asegúrate de definir el router aquí

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  // Si no se proporciona un username, asignar un valor predeterminado o generar uno.
  const usernameToUse = username || email.split('@')[0];  // Ejemplo: usar la parte del correo como username

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username: usernameToUse,  // Usar el username generado o proporcionado
      password: hashedPassword,
    });

    await newUser.save();

    const payload = { userId: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario registrado con éxito', token });
  } catch (error) {
    console.error('Error en la ruta de registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }
  
      // Generar el token JWT
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Responder con el token
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error en la ruta de login:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
  
module.exports = router;  // Exportar el router para usarlo en el server.js

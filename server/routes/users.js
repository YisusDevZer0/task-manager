const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

module.exports = router;
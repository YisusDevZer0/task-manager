// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Único, no puede haber dos usuarios con el mismo correo
  },
  username: {
    type: String,
    unique: true,  // Si tienes este campo, asegúrate de que no sea null
    required: true, // Asegúrate de que el campo no esté vacío
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

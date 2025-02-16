// src/components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'; // Asegúrate de instalar sweetalert2
import { logout } from '../features/authSlice'; // Importa la acción de logout

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Disparar la acción de logout
    dispatch(logout());

    // Mostrar mensaje de confirmación
    Swal.fire({
      title: '¡Sesión cerrada!',
      text: 'Serás redirigido al inicio en breve.',
      icon: 'success',
      timer: 3000, // El mensaje se muestra por 3 segundos
      showConfirmButton: false, // Oculta el botón de confirmación
    }).then(() => {
      // Recargar la página después de 3 segundos
      setTimeout(() => {
        window.location.reload(); // Recarga la página actual
      }, 3000); // Espera 3 segundos antes de recargar
    });
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
};

export default LogoutButton;

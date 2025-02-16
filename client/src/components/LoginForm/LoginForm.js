import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { ToastContainer, toast } from 'react-toastify'; // Importa las funciones de toastify
import 'react-toastify/dist/ReactToastify.css'; // Estilos de react-toastify
import RegisterForm from './Registerform'; // Importa correctamente el componente RegisterForm

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el indicador de carga
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar el mensaje de error
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Estado para controlar la visibilidad del formulario de registro

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    // Valida que los campos no estén vacíos
    if (!email || !password) {
      toast.error('Por favor, ingresa un correo y una contraseña'); // Notificación de error
      return;
    }

    setIsLoading(true); // Empieza a mostrar el mensaje de carga
    setErrorMessage(''); // Resetea cualquier mensaje de error previo

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Muestra un mensaje de éxito al iniciar sesión
        toast.success('Login exitoso'); 

        console.log('Token:', data.token); // Muestra el token en consola (para pruebas)
        // Almacena el token en localStorage (o en un estado global, como Redux)
        localStorage.setItem('authToken', data.token);

        // Esperar 2 segundos antes de mostrar el mensaje de bienvenida
        setTimeout(() => {
          toast.info('Bienvenido! Espera un momento...', {
            autoClose: 3000, // Mensaje de bienvenida por 3 segundos
          });
        }, 2000); // Esperar 2 segundos antes de mostrar el mensaje de bienvenida

        // Recarga la página después del mensaje de bienvenida
        setTimeout(() => {
          window.location.reload(); // Recarga la página actual
        }, 5000); // Esperar 5 segundos antes de recargar la página

      } else {
        toast.error(data.message || 'Error en el login'); // Notificación de error
      }
    } catch (error) {
      console.error('Error en el login:', error);
      toast.error('Error al iniciar sesión'); // Notificación de error en caso de fallo
    } finally {
      setIsLoading(false); // Termina la carga
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Muestra el error si existe */}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button> {/* Cambia el texto del botón mientras carga */}
      </form>

      {/* Botón para mostrar el formulario de registro */}
      <button
        type="button"
        onClick={() => setShowRegisterForm(!showRegisterForm)}
        style={{ marginTop: '1rem' }}
      >
        ¿Quieres registrarte?
      </button>

      {/* Mostrar el formulario de registro solo si showRegisterForm es true */}
      {showRegisterForm && <RegisterForm />} {/* Renderiza solo cuando showRegisterForm es true */}

      {/* Agregar el contenedor de las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

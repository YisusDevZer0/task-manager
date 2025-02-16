import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './components/LoginForm/Registerform';
import LoginForm from './components/LoginForm/LoginForm'; 
import TaskList from './components/TaskList/TaskList';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logout } from './features/authSlice'; // Asegúrate de importar la acción logout

const Header = () => (
  <header className="app-header">
    <h1>📝 Gestor de Tareas</h1>
  </header>
);

const Footer = () => (
  <footer className="app-footer">
    <p>&copy; {new Date().getFullYear()} Desarrollado por Jesús Mutul</p>
  </footer>
);

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Cerrarás sesión y perderás tu acceso temporalmente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Cerrar sesión',
    }).then((result) => {
      if (result.isConfirmed) {
        // Ejecutar acción de logout
        dispatch(logout());  // Acción de Redux para cerrar sesión
        Swal.fire('Sesión cerrada', 'Has cerrado sesión correctamente', 'success')
          .then(() => {
            // Eliminar token y redirigir a login
            localStorage.removeItem('authToken'); // Eliminar el token de localStorage
            window.location.reload(); // Recarga la página actual
          });
      }
    });
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);  // Si el token está en localStorage, se considera autenticado
    }
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        {!isAuthenticated ? (
          <div className="login-form-container">
            <LoginForm />
          </div>
        ) : (
          <div>
            <LogoutButton /> {/* Botón de cierre de sesión */}
            <TaskList />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

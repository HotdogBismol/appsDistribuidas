import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importa los estilos CSS para este componente

// Componente Login para el inicio de sesión de usuarios
const Login = ({ onLoginSuccess }) => {
  // Estado para almacenar las credenciales del usuario (nombre de usuario y contraseña)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // Estado para manejar los mensajes de error durante el inicio de sesión
  const [error, setError] = useState('');

  // Función para manejar los cambios en los campos de entrada (input fields)
  const handleChange = (e) => {
    // Actualiza el estado de las credenciales manteniendo los valores existentes
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    try {
      // Construye la URL para la solicitud de inicio de sesión
      const url = `http://localhost:8080/elRest/webresources/webresources/usuariosConsultarD?usuario=${credentials.username}`;
      // Realiza una solicitud GET para verificar las credenciales del usuario
      const response = await axios.get(url);
      const userData = response.data[0]; // Accede al primer objeto del array de respuesta
      
      // Comprueba si las credenciales son correctas
      if (userData && userData.contrasena === credentials.password) {
        // Almacena la información del usuario en localStorage y notifica el éxito del inicio de sesión
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('userNombre', userData.usuario);
        localStorage.setItem('userc', userData.contrasena);
        onLoginSuccess();
      } else {
        // Establece un mensaje de error si las credenciales son incorrectas
        setError('Contraseña incorrecta');
      }
    } catch (error) {
      // Captura y maneja errores en la solicitud
      console.error('Error en el inicio de sesión', error);
      setError('Error en el inicio de sesión');
    }
  }

  // Renderiza el formulario de inicio de sesión
  return (
    <div className="login-container">
      <img className='imagenlibro' src='/libros.png' alt='No hay'></img><br></br>
      <img className='imagenlibro' src='/letras.png' alt='No hay'></img>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Campo para el nombre de usuario */}
        <div>
          <label className='equisde' htmlFor="username">Nombre de usuario:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        {/* Campo para la contraseña */}
        <div>
          <label className='equisde' htmlFor="password">Contraseña:</label><br></br>
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="input-field" 
          />
        </div>
        {/* Botón para enviar el formulario */}
        <button type="submit" className="submit-button">Iniciar Sesión</button>
        {/* Mensaje de error en caso de haberlo */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;

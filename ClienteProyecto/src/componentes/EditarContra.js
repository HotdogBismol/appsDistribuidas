import React, { useState } from 'react';
import axios from 'axios';

import './generalalv.css';

// Componente EditarContra para cambiar la contraseña del usuario.
const EditarContra = ({ sePidioCambio, deregreso }) => {
  // Estado para la nueva contraseña.
  const [newPassword, setNewPassword] = useState('');
  // Estado para manejar mensajes de error.
  const [error, setError] = useState('');
  // Estado para confirmar que la contraseña ha sido cambiada con éxito.
  const [success, setSuccess] = useState(false);



  // Obtener el ID y el nombre del usuario de localStorage.
  const userId = localStorage.getItem('userId');
  const userNombre = localStorage.getItem('userNombre');



  // Manejador para los cambios en el input de la nueva contraseña.
  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };


  
  // Manejador para el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario.
    try {
      // Construir la URL para la solicitud de edición.
      const url = `http://localhost:8080/elRest/webresources/webresources/usuariosEditar?id=${userId}&usuario=${userNombre}&contrasena=${newPassword}`;
      // Hacer la solicitud PUT con axios.
      await axios.put(url, {
        id: userId,
        contrasena: newPassword,
      });
      // Si no hay errores, actualizar el estado para reflejar el éxito y limpiar el formulario.
      setSuccess(true);
      setError('');
      setNewPassword('');
    } catch (error) {
      // En caso de error, actualizar el estado para mostrar el mensaje de error.
      console.error('Error al cambiar la contraseña', error);
      setError('Error al cambiar la contraseña');
      setSuccess(false);
    }
  };

  return (
    <div className="contenedor-principal">
      {/* Formulario para la nueva contraseña */}
      <form onSubmit={handleSubmit} className="formulario-general">
        <div>
          <label htmlFor="newPassword">Nueva Contraseña:</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={handleChange}
            required
            className="input-edicion"
          />
        </div>
        <button type="submit" className="btn-guardar">Cambiar Contraseña</button>
        {/* Mensaje de error si hay un problema al cambiar la contraseña */}
        {error && <p className="error-message">{error}</p>}
        {/* Mensaje de éxito si la contraseña se cambia correctamente */}
        {success && <p className="success-message">Contraseña actualizada con éxito</p>}
      </form>
      {/* Botón para regresar al catálogo */}
      <button onClick={deregreso} className="btn-cancelar">Regresar</button>
    </div>
  );
};

export default EditarContra;

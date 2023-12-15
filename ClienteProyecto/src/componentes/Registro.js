import React, { useState } from "react";
import axios from "axios";

import './Login.css';
import './generalalv.css';

// Define el componente Registro
const Registro = ({deregreso2, onLoginSuccess}) => {
  // Estados para almacenar la información del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (correo === contrasena) {
      console.log("Si son ");
      if (nombre === "") {
        console.log("no hay nada");
      } else {
        const url = `http://localhost:8080/elRest/webresources/webresources/usuariosInsertar?usuario=${nombre}&contrasena=${contrasena}`;
        axios.post(url);
        localStorage.setItem('userNombre', nombre);
        onLoginSuccess();
        localStorage.setItem('isLoggedIn', 'true');
      }
    } else {
      console.log("No son iguales");
    }

    // Aquí podrías realizar alguna lógica para enviar los datos a tu servidor, base de datos, etc.

    // Reinicia los estados después de enviar el formulario
    setNombre("");
    setCorreo("");
    setContrasena("");
  };

  // Renderiza el componente con el formulario de registro
  return (
    <div className="login-container">
            <img className='imagenlibro' src='/libros.png' alt='No hay'></img><br></br>
      <h2 className="equisdem">Registro</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="equisde"> 
          Nombre:
          <br></br>
          <input
            className="input-field"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <br />
        <label className="equisde">
          Contraseña:
          <input
            type="password"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>
        <br />
        <label className="equisde">
          Verificar Contraseña:
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Registrarse</button>
      </form>
      <br></br>
      <button className="btn-cancelar" onClick={deregreso2}>Cancelar</button>
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default Registro;

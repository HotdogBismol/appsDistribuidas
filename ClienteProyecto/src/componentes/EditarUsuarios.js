import React, { useState, useEffect } from "react";
import axios from "axios";
import './generalalv.css';

const TablaUsuarios = ( { deregreso } ) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [datosEditados, setDatosEditados] = useState({ usuario: '', contrasena: '' , saldo: ''});

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/elRest/webresources/webresources/usuariosConsultar");
        console.log("Respuesta del servidor:", response.data); // Debería mostrar el array de usuarios
        setUsuarios(response.data); // Ya que la respuesta es JSON, la usamos directamente
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    };

    fetchUsuarios();
  }, []);



  const handleGuardar = async () => {
    if (!usuarioEditar) return;
  
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/usuariosEditar?id=${usuarioEditar.id}&usuario=${encodeURIComponent(datosEditados.usuario)}&contrasena=${encodeURIComponent(datosEditados.contrasena)}&saldo=${encodeURIComponent(datosEditados.saldo)}`;
      const response = await axios.put(url);
  
      if (response.status === 200 || response.status === 204) {
        setUsuarios(usuarios.map((user) => (user.id === usuarioEditar.id ? { ...user, ...datosEditados } : user)));
        setUsuarioEditar(null);
        setDatosEditados({ usuario: '', contrasena: '', saldo: '' });
      }
    } catch (error) {
      console.error('Error al guardar los cambios', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEditados({ ...datosEditados, [name]: value });
  };

  const handleEliminar = async (id) => {
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/usuariosEliminar?id=${id}`;
      const response = await axios.delete(url); // Usar método DELETE si es apropiado
  
      if (response.status === 200 || response.status === 204) {
        // Filtrar el usuario eliminado de la lista
        const usuariosActualizados = usuarios.filter(usuario => usuario.id !== id);
        setUsuarios(usuariosActualizados);
      }
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };
  

  return (
<div className="contenedor-principal">
  
      <h2 className="titulo-usuarios">Usuarios</h2>
      <table className="tabla-general">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Saldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>
                {usuarioEditar?.id === usuario.id ? (
                  <input
                    className="input-edicion"
                    name="usuario"
                    value={datosEditados.usuario}
                    onChange={handleInputChange}
                  />
                ) : (
                  usuario.usuario
                )}
              </td>
              <td>
                {usuarioEditar?.id === usuario.id ? (
                  <input
                    className="input-edicion"
                    name="contrasena"
                    value={datosEditados.contrasena}
                    onChange={handleInputChange}
                  />
                ) : (
                  usuario.contrasena
                )}
              </td>
              <td>
  {usuarioEditar?.id === usuario.id ? (
    <input
      className="input-edicion"
      name="saldo" // El nombre debe coincidir con la clave en el estado datosEditados
      type="text" // o type="number" si saldo es numérico
      value={datosEditados.saldo}
      onChange={handleInputChange}
    />
  ) : (
    usuario.saldo
  )}
</td>
              <td>
                {usuarioEditar?.id === usuario.id ? (
                  <>
                    <button className="btn-guardar" onClick={() => handleGuardar()}>Guardar</button>
                    <button className="btn-cancelar" onClick={() => setUsuarioEditar(null)}>Cancelar</button>
                  </>
                ) : (
                  <button className="btn-editar" onClick={() => {
                    setUsuarioEditar(usuario);
                    setDatosEditados({ usuario: usuario.usuario, contrasena: usuario.contrasena });
                  }}>Editar</button>
                )}
                <button className="btn-eliminar" onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={deregreso} className="btn-cancelar">Regresar</button>
    </div>
  );
};

export default TablaUsuarios;

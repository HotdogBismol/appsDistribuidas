import React, { useState, useEffect } from "react";
import axios from "axios";


const EditarOrdenes = ({ deregreso }) => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/elRest/webresources/webresources/ordenConsultar", {
          headers: {
            'Accept': 'application/xml'
          }
        });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const ordenes = Array.from(xmlDoc.getElementsByTagName("rOrden")).map(orden => ({
          fecha: orden.getElementsByTagName("fecha")[0].textContent,
          idLibro: orden.getElementsByTagName("idLibro")[0].textContent,
          idOrden: orden.getElementsByTagName("idOrden")[0].textContent,
          idUsuario: orden.getElementsByTagName("idUsuario")[0].textContent
        }));

        setOrdenes(ordenes);
      } catch (error) {
        console.error("Error al obtener ordenes", error);
      }
    };

    fetchOrdenes();
  }, []);

  const handleEliminar = async (idOrden) => {
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/ordenEliminar?id=${idOrden}`;
      const response = await axios.delete(url);

      if (response.status === 200 || response.status === 204) {
        const ordenesActualizadas = ordenes.filter(orden => orden.idOrden !== idOrden);
        setOrdenes(ordenesActualizadas);
      }
    } catch (error) {
      console.error('Error al eliminar orden', error);
    }
  };

  return (
    <div className="contenedor-principal">
      <h2 className="titulo-ordenes">Órdenes</h2>
      <table className="tabla-general">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Fecha</th>
            <th>ID Libro</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.idOrden}>
              <td>{orden.idOrden}</td>
              <td>{orden.fecha}</td>
              <td>{orden.idLibro}</td>
              <td>{orden.idUsuario}</td>
              <td>
                <button className="btn-eliminar" onClick={() => handleEliminar(orden.idOrden)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={deregreso} className="regreso-button">Regresar</button>
    </div>
  );
};

export default EditarOrdenes;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Catalogo.css';

// Componente Catalogo que muestra una lista de libros disponibles
const Catalogo = ({ onVerDetalles }) => {
  // Estado para almacenar los libros obtenidos de la API
  const [libros, setLibros] = useState([]);
  // Estado para almacenar errores si la carga falla
  const [error, setError] = useState('');


  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener los datos de los libros
    const fetchData = async () => {
      try {
        // Realiza una solicitud GET para obtener los libros
        const response = await axios.get('http://localhost:8080/elRest/webresources/webresources/catalogoConsultar', {
          headers: {
            'Accept': 'application/xml' // Indica que esperamos una respuesta XML
          }
        });
        // Analiza la respuesta XML y extrae los datos de los libros
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const libros = Array.from(xmlDoc.getElementsByTagName("rCatalogo")).map(libro => {
          // Mapea cada libro a un objeto con sus detalles
          return {
            idLibro: libro.getElementsByTagName("idLibro")[0].textContent,
            titulo: libro.getElementsByTagName("titulo")[0].textContent,
            autor: libro.getElementsByTagName("autor")[0].textContent,
            precio: libro.getElementsByTagName("precio")[0].textContent,
            imagen: libro.getElementsByTagName("imagen")[0].textContent,
            descri: libro.getElementsByTagName("descri")[0].textContent
          };
        });
        
        // Actualiza el estado con la lista de libros
        setLibros(libros);
      } catch (error) {
        // Captura cualquier error durante la carga y actualiza el estado de error
        console.error('Error al cargar el catálogo', error.response || error.message);
        setError('Error al cargar el catálogo');
      }
    };
  
    // Llama a la función fetchData para obtener los datos
    fetchData();
  }, []);
  
  // Renderiza el componente Catalogo
  return (
    <div className="catalogo-container">
      {/* Muestra un mensaje de error si existe */}
      {error && <p>{error}</p>}
      {/* Lista de libros */}
      <ul className="catalogo-lista">
        {libros.map(libro => (
          // Cada libro se muestra como un item de lista
          <li key={libro.idLibro} className="catalogo-item">
            <img className='fotito' src={libro.imagen} alt={`Portada de ${libro.titulo}`} />
            <div className='text-container'>
            <h3 className="catalogo-titulo">{libro.titulo}</h3>
            <p className="catalogo-autor">{libro.autor}</p>
            <p className="catalogo-precio">${libro.precio}</p>
            {/* Botón para ver detalles del libro */}
            </div>
              <button onClick={() => onVerDetalles(libro.idLibro)} className="detalle-button">Ver Detalles</button>
            {/* Muestra el userId, aunque esto parece estar fuera de lugar */}
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalogo;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './consultar.css';

const Consultar = ({ idLibro, deregreso, userName, users }) => {
  const [libro, setLibro] = useState(null);
  const [error, setError] = useState('');
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [userSaldo, setUserSaldo] = useState(0);

  const userId = localStorage.getItem('userId');
  const userc = localStorage.getItem('userc');

  const consultarSaldoUsuario = useCallback(async () => {
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/usuariosConsultarD?usuario=${userName}`;
      const response = await axios.get(url);
      const usuario = response.data.find(usr => usr.usuario === userName);
      if (usuario && usuario.saldo !== undefined) {
        const saldoNumerico = parseFloat(usuario.saldo);
        setUserSaldo(saldoNumerico);
      } else {
        throw new Error('Usuario no encontrado o saldo no disponible');
      }
    } catch (error) {
      setError(`Error al consultar el saldo del usuario: ${error.message}`);
      console.error(error);
    }
  }, [userName]);

  useEffect(() => {
    if (idLibro) {
      const fetchLibro = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/elRest/webresources/webresources/catalogoConsultarPorId?id=${idLibro}`, {
            headers: {
              'Accept': 'application/xml'
            }
          });
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, "text/xml");
          const libroXml = xmlDoc.getElementsByTagName("rCatalogo")[0];
          if (!libroXml) {
            setError('Libro no encontrado');
            return;
          }
          const libroParsed = {
            idLibro: libroXml.getElementsByTagName("idLibro")[0]?.textContent ?? '',
            imagen: libroXml.getElementsByTagName("imagen")[0]?.textContent ?? '',
            titulo: libroXml.getElementsByTagName("titulo")[0]?.textContent ?? '',
            autor: libroXml.getElementsByTagName("autor")[0]?.textContent ?? '',
            precio: libroXml.getElementsByTagName("precio")[0]?.textContent ?? '',
            reseña: libroXml.getElementsByTagName("descri")[0]?.textContent ?? '',
            categoria: libroXml.getElementsByTagName("categoria")[0]?.textContent ?? '',
            estock: libroXml.getElementsByTagName("estock")[0]?.textContent ?? ''
          };
          setLibro(libroParsed);
        } catch (error) {
          setError('Error al cargar los detalles del libro');
        }
      };

      fetchLibro();
    }
  }, [idLibro]);

  useEffect(() => {
    if (userName) {
      consultarSaldoUsuario();
    }
  }, [consultarSaldoUsuario, userName]);

  const handleCompra = async () => {
    if (userSaldo >= libro.precio && libro.estock > 0) {
      try {
        const ordenResponse = await axios.post(`http://localhost:8080/elRest/webresources/webresources/ordenInsertar`, null, {
          params: { idusuario: userId, idlibro: libro.idLibro }
        });
        if (ordenResponse.status === 200 || ordenResponse.status === 201) {
          await actualizarStockLibro(libro.estock - 1);
          await actualizarSaldoUsuario(userSaldo - libro.precio);
          setCompraExitosa(true);
          deregreso();
        } else {
          setError('No se pudo realizar la compra.');
        }
      } catch (error) {
        setError('Ha ocurrido un error al intentar realizar la compra.');
        console.error(error);
      }
    } else {
      if (libro.estock <= 0) {
        setError('Este libro está agotado o no está disponible.');
      } else {
        setError('Fondos insuficientes para realizar la compra.');
      }
    }
  };

  const actualizarStockLibro = async (nuevoStock) => {
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/catalogoEditar?id=${libro.idLibro}&titulo=${encodeURIComponent(libro.titulo)}&autor=${encodeURIComponent(libro.autor)}&precio=${libro.precio}&descri=${encodeURIComponent(libro.reseña)}&estock=${nuevoStock}&imagen=${encodeURIComponent(libro.imagen)}&categoria=${encodeURIComponent(libro.categoria)}`;
      const response = await axios.put(url);
      if (response.status !== 200 && response.status !== 204) {
        throw new Error('La respuesta del servidor no indica éxito.');
      }
    } catch (error) {
      console.error('No se pudo actualizar el stock del libro.', error);
      setError('No se pudo actualizar el stock del libro.');
    }
  };

  const actualizarSaldoUsuario = async (nuevoSaldo) => {
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/usuariosEditar?id=${userId}&usuario=${userName}&contrasena=${userc}&saldo=${nuevoSaldo}`;
      await axios.put(url);
    } catch (error) {
      setError('Error al actualizar el saldo del usuario.');
    }
  };

  return (
    <div className='book-container'>
      {error && <p className="error">{error}</p>}
      {!libro && <div>Cargando detalles del libro...</div>}
      {libro && (
        <>
          <div className="book-detail">
            <img className='book-image' src={libro.imagen} alt={`Portada de ${libro.titulo}`} />
            <div className="book-info">
              <h2 className='book-title'>{libro.titulo}</h2>
              <p className='book-category'>Categoría: {libro.categoria}</p>
              <p className='book-author'>Autor: {libro.autor}</p>
              <p className='book-isbn'>Precio: ${libro.precio}</p>
              <p>Saldo del usuario: ${userSaldo}</p>  
            </div>
          </div>
          <p className='book-synopsis'>Reseña: {libro.reseña}</p>
          {!compraExitosa ? (
            <button onClick={handleCompra} className="buy-button">Comprar Libro</button>
          ) : (
            <p className="success">Compra realizada con éxito.</p>
          )}
          <button onClick={deregreso} className="back-button">Regresar al Catálogo</button>
        </>
      )}
    </div>
  );
};

export default Consultar;

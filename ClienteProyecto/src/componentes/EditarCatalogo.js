import React, { useState, useEffect } from "react";
import axios from "axios";
import './generalalv.css';


const EditarCatalogo = ({ deregreso }) => {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState('');
    const [categoria, setCategoria] = useState('');
  const [catalogo, setCatalogo] = useState([]);
  const [itemEditar, setItemEditar] = useState(null);
  const [datosEditados, setDatosEditados] = useState({
    idLibro: '',
    titulo: '',
    autor: '',
    precio: '',
    descri: '',
    estock: '',
    imagen: '',
    categoria: ''
  });

  

  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/elRest/webresources/webresources/catalogoConsultar', {
          headers: {
            'Accept': 'application/xml'
          }
        });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const catalogo = Array.from(xmlDoc.getElementsByTagName("rCatalogo")).map(item => ({
          idLibro: item.getElementsByTagName("idLibro")[0].textContent,
          titulo: item.getElementsByTagName("titulo")[0].textContent,
          autor: item.getElementsByTagName("autor")[0].textContent,
          precio: item.getElementsByTagName("precio")[0].textContent,
          descri: item.getElementsByTagName("descri")[0].textContent,
          estock: item.getElementsByTagName("estock")[0].textContent,
          imagen: item.getElementsByTagName("imagen")[0].textContent,
          categoria: item.getElementsByTagName("categoria")[0].textContent
        }));

        setCatalogo(catalogo);
      } catch (error) {
        console.error("Error al obtener o procesar el catálogo:", error);
      }
    };

    fetchCatalogo();
  }, []);

  const handleEditar = (item) => {
    setItemEditar(item);
    setDatosEditados({ ...item });
  };

  const handleGuardar = async () => {
    if (!itemEditar) return;
  
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/catalogoEditar?id=${itemEditar.idLibro}&titulo=${encodeURIComponent(datosEditados.titulo)}&autor=${encodeURIComponent(datosEditados.autor)}&precio=${datosEditados.precio}&descri=${encodeURIComponent(datosEditados.descri)}&estock=${datosEditados.estock}&imagen=${encodeURIComponent(datosEditados.imagen)}&categoria=${encodeURIComponent(datosEditados.categoria)}`;
      const response = await axios.put(url);
  
      if (response.status === 200 || response.status === 204) {
        setCatalogo(catalogo.map((item) => (item.idLibro === itemEditar.idLibro ? { ...item, ...datosEditados } : item)));
        setItemEditar(null);
        setDatosEditados({
          titulo: '',
          autor: '',
          precio: '',
          descri: '',
          estock: '',
          imagen: '',
          categoria: ''
        });
      }
    } catch (error) {
      console.error('Error al guardar los cambios en el catálogo', error);
    }
  };
    
  
  


  const handleCancelar = () => {
    setItemEditar(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEditados({ ...datosEditados, [name]: value });
  };

  const handleAgregar = async () => {
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/catalogoInsertar?titulo=${titulo}&autor=${autor}&precio=${precio}&descri=${descripcion}&estock=${stock}&imagen=${imagen}&categoria=${categoria}`;
      const response = await axios.post(url);
  
      if (response.status === 200 || response.status === 204) {
        // Después de agregar el libro, actualiza el estado con el nuevo libro
        setCatalogo([...catalogo, response.data]);
      }
    } catch (error) {
      console.error('Error al agregar elemento al catálogo', error);
    }
  
    // Reinicia los estados después de enviar el formulario
    setTitulo('');
    setAutor('');
    setPrecio('');
    setDescripcion('');
    setStock('');
    setImagen('');
    setCategoria('');
  };
  

  const handleEliminar = async (idLibro) => {
    try {
      const url = `http://localhost:8080/elRest/webresources/webresources/catalogoEliminar/?id=${idLibro}`;
      const response = await axios.delete(url);
  
      if (response.status === 200 || response.status === 204) {
        const catalogoActualizado = catalogo.filter(item => item.idLibro !== idLibro);
        setCatalogo(catalogoActualizado);
      }
    } catch (error) {
      console.error('Error al eliminar elemento del catálogo', error);
    }
  };
  

  return (
    <>
    <br></br>
    <div className="regreso-button-container">
  <button onClick={deregreso} className="btn-cancelar">Regresar</button>
</div>

<div className="contenedor-principal">
  <form onSubmit={handleAgregar} className="formulario-general">
    <label>
      Título:
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="input-edicion"
      />
    </label>
    <br />
    <label>
      Autor:
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        className="input-edicion"
      />
    </label>
    <br />
    <label>
      Precio:
      <input
        type="text"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="input-edicion"
      />
    </label>
    <br />
    <label>
      Descripción:
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="input-edicion"
      />
    </label>
    <br />
    <label>
      Stock:
      <input
        type="text"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="input-edicion"
      />
    </label>
    <br />
    <label>
      Imagen:
      <input
        type="text"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        className="input-edicion"
      />
    </label>
    <br />
    <label>
      Categoría:
      <input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="input-edicion"
      />
    </label>
    <br />
    <button type="submit" className="btn-guardar">Enviar</button>
  </form> 

  <table className="tabla-general">
    <thead>
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Autor</th>
        <th>Precio</th>
        <th>Descripción</th>
        <th>Stock</th>
        <th>Imagen</th>
        <th>Categoría</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {catalogo.map((item) => (
        <tr key={item.idLibro}>
          <td>{item.idLibro}</td>
          {Object.keys(datosEditados).map((key) => {
            if (key !== 'idLibro') {
              return (
                <td key={key}>
                  {itemEditar?.idLibro === item.idLibro ? (
                    <input
                      name={key}
                      value={datosEditados[key]}
                      onChange={handleInputChange}
                      className="input-edicion"
                    />
                  ) : (
                    item[key]
                  )}
                </td>
              );
            } else {
              return null;
            }
          })}
          <td>
            {itemEditar?.idLibro === item.idLibro ? (
              <>
                <button onClick={handleGuardar} className="btn-guardar">Guardar</button>
                <button onClick={handleCancelar} className="btn-cancelar">Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditar(item)} className="btn-editar">Editar</button>
                <button onClick={() => handleEliminar(item.idLibro)} className="btn-eliminar">Eliminar</button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

</div>
</>
  );
};

export default EditarCatalogo;

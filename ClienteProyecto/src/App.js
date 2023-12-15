import React, { useState, useEffect } from 'react'; 

// Importa los componentes que se usarán en diferentes vistas
import Login from './componentes/Login';
import Catalogo from './componentes/Catalogo';
import Consultar from './componentes/consultar';
import Header from './componentes/Header';
import EditarContra from './componentes/EditarContra';
import Registro from './componentes/Registro';
import EditarUsuarios from './componentes/EditarUsuarios';
import EditarCatalogo from './componentes/EditarCatalogo';
import EditarOrdenes from './componentes/EditarOrdenes';


// Componente principal App que maneja la vista actual y la navegación
const App = () => {
  // Estado que controla qué vista se debe mostrar
  const [vistaActual, setVistaActual] = useState('login');
  // Estado que guarda el libro seleccionado para ver detalles
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  // Obtener el nombre de usuario del almacenamiento local
  const userName = localStorage.getItem('userNombre');
  const userc = localStorage.getItem('userc');
  const users = localStorage.getItem('users');

  // Efecto que revisa si el usuario está logueado para mostrar el catálogo
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      setVistaActual('catalogo');
    }
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setVistaActual('login');
  };

  const noRegistro = () => {
    setVistaActual('login');
  }

  // Función que se ejecuta después de un inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setVistaActual('catalogo');
  };
  
  // Función para ver los detalles de un libro
  const verDetalles = (idLibro) => {
    setLibroSeleccionado(idLibro);
    setVistaActual('consultar');
  };

  // Función para cambiar la vista actual a la de cambiar contraseña
  const hacerCambio = () => {
    setVistaActual('cambiarContrasena');
  };

  const irRegistro = () => {
    setVistaActual('registro');
  }

  const irUsuarios = () => {
    setVistaActual('cambiarUsuarios');
  }

  const irCatalogo = () => {
    setVistaActual('cambiarCatalogo');
  }

  const irOrden = () => {
    setVistaActual('cambiarOrden');
  }
  
  // Renderiza el componente App y sus vistas condicionales
  return (
    <div>
      {/* Header que muestra la barra superior y maneja la lógica de sesión */}
      <Header isLoggedIn={localStorage.getItem('isLoggedIn') === 'true'} userName={userName} handleLogout={handleLogout} sePidioCambio={hacerCambio} nuevoUsuario={irRegistro} eUsuario ={irUsuarios} eCatalogo ={irCatalogo} eOrden ={irOrden}/>
      {/* Renderiza el Login si la vistaActual es 'login' */}
      {vistaActual === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {/* Renderiza el Catálogo si la vistaActual es 'catalogo' */}
      {vistaActual === 'catalogo' && <Catalogo onVerDetalles={verDetalles} />}
      {/* Renderiza la vista de Consultar si la vistaActual es 'consultar' */}
      {vistaActual === 'consultar' && <Consultar idLibro={libroSeleccionado} users={users} userName={userName} userc={userc} deregreso={handleLoginSuccess} />}
      {/* Renderiza la vista de EditarContra si la vistaActual es 'cambiarContrasena' */}
      {vistaActual === 'cambiarContrasena' && <EditarContra deregreso={handleLoginSuccess} />}
      {vistaActual === 'registro' && <Registro deregreso2={noRegistro} onLoginSuccess={handleLoginSuccess}/>}
      {vistaActual === 'cambiarUsuarios' && <EditarUsuarios deregreso={handleLoginSuccess} />}
      {vistaActual === 'cambiarCatalogo' && <EditarCatalogo deregreso={handleLoginSuccess} />}
      {vistaActual === 'cambiarOrden' && <EditarOrdenes deregreso={handleLoginSuccess} />}
    </div>
  );
};

export default App;

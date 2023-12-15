import React from 'react';
import './Header.css';

// Componente Header que muestra la barra de navegación en la parte superior de la página
const Header = ({ isLoggedIn, userName, handleLogout, sePidioCambio, nuevoUsuario, eUsuario, eCatalogo, eOrden }) => {
  return (
    <header className="header-container">
      {/* Sección izquierda del encabezado, generalmente para el logo o imagen */}
      <div className="header-left">
        <img src="/BIBLIOTECA.png" alt="Descripción de la imagen" className="header-image" />
      </div>
      
      {/* Contenido del encabezado que cambia según si el usuario está logueado o no */}
      {isLoggedIn ? (
        // Si el usuario está logueado, muestra opciones adicionales
        <div className="header-right">
          <div>
            {/* Muestra el nombre de usuario y un menú desplegable con opciones */}
            <span className="header-username">Bienvenido, {userName}</span>
            <div className="dropdown">
              <span className='header-username'>...</span>
              <div className="dropdown-content">
                {/* Opciones específicas para el administrador */}
                {userName === 'admin' ? (
                  <>
                    <button onClick={eUsuario}>Editar Usuarios</button>
                    <button onClick={eCatalogo}>Editar Catálogo</button>
                    <button onClick={eOrden}>Editar Órdenes</button>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </>
                ) : (
                  // Opciones para usuarios normales
                  <>
                    <button onClick={handleLogout} className="dropdown-link">Cerrar Sesión</button>
                    <button onClick={sePidioCambio}>Cambiar Contraseña</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Si el usuario no está logueado, muestra un enlace para registrarse
      <p className='header-username'>No tienes cuenta?,
        <button onClick={nuevoUsuario} className='registroLink'>
        Registrate
        </button>
      </p>

      )}
    </header>
  );
};

export default Header;

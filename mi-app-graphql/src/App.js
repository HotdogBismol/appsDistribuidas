import logo from './logo.svg';
import './App.css';
import CrearPost from './componentes/componenteInsertar';
import LeerPosts from './componentes/LeerPost';
import EliminarPost from './componentes/eliminarPost';
import ActualizarPost from './componentes/actualizarPost';

function App() {
  return (
    <div className="App">
      <LeerPosts></LeerPosts>
      <CrearPost></CrearPost>
      <ActualizarPost></ActualizarPost>
      <EliminarPost></EliminarPost>
    </div>
  );
}

export default App;

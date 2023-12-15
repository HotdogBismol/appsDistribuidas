import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_POST = gql`
  mutation AddPost($post: PostInput!) {
    createPost(post: $post) {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;

function CrearPost() {// Puede que genere pedos
  const [post, setPost] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    pais: ''
  });

  const [addPost] = useMutation(ADD_POST);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ variables: { post } });
    setPost({ nombre: '', apellidos: '', edad: '', pais: '' });
    window.location.reload();
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={post.nombre}
        onChange={handleChange}
        type="text"
        placeholder="Nombre"
        style={{ margin: '5px', padding: '10px' }}
      />
      <input
        name="apellidos"
        value={post.apellidos}
        onChange={handleChange}
        type="text"
        placeholder="Apellidos"
        style={{ margin: '5px', padding: '10px' }}
      />
      <input
        name="edad"
        value={post.edad}
        onChange={handleChange}
        type="text"
        placeholder="Edad"
        style={{ margin: '5px', padding: '10px' }}
      />
      <input
        name="pais"
        value={post.pais}
        onChange={handleChange}
        type="text"
        placeholder="País"
        style={{ margin: '5px', padding: '10px' }}
      />
      <button type="submit" style={{ margin: '5px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>Añadir Post</button>
    </form>
  );
}

export default CrearPost;

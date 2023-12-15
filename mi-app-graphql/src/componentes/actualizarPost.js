import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $post: PostInput!) {
    updatePost(id: $id, post: $post) {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;

function ActualizarPost() {
  const [id, setId] = useState('');
  const [post, setPost] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    pais: ''
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({ variables: { id, post } });
    setId('');
    setPost({ nombre: '', apellidos: '', edad: '', pais: '' });
    window.location.reload();
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={id}
        onChange={e => setId(e.target.value)}
        type="text"
        placeholder="ID del Post"
        style={{ margin: '5px', padding: '10px' }}
      />
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
      <button type="submit" style={{ margin: '5px', padding: '10px', backgroundColor: '#0000FF', color: 'white', border: 'none', borderRadius: '5px' }}>Actualizar Post</button>
    </form>
  );
}

export default ActualizarPost;

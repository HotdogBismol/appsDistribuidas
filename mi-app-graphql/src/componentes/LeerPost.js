import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    mostrar {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;

function LeerPosts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <h2 style={{ width: '100%', textAlign: 'center' }}>Lista de Posts</h2>
      {data.mostrar.map(post => (
        <div key={post.id} style={{ flex: '1 0 18%', margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', boxSizing: 'border-box', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p><strong>ID:</strong> {post.id}</p>
          <p><strong>Nombre:</strong> {post.nombre} {post.apellidos}</p>
          <p><strong>Edad:</strong> {post.edad}</p>
          <p><strong>País:</strong> {post.pais}</p>
        </div>
      ))}
    </div>
  );
}

export default LeerPosts;

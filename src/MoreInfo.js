// MoreInfo.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const MoreInfo = ({ nasaData }) => {
  const { id } = useParams();

  
  const selectedItem = nasaData.find(item => item.title === id);

  if (!selectedItem) {
    return <div>Elemento no encontrado</div>;
  }

  return (
    <Container className="text-white text-center">
      <h1 className="mb-4">{selectedItem.title}</h1>
      <img
        src={selectedItem.hdurl}
        alt={selectedItem.title}
        className="img-fluid"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <div className="text-container mt-4 mb-4">
        <p style={{ fontSize: '1.2rem' }}>{selectedItem.explanation}</p>
      </div>
    </Container>
  );
};

export default MoreInfo;

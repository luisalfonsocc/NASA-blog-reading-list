import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaRegGrinHearts } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = ({ nasaData, handleFavoriteClick }) => {
  return (
    <Row xs={1} md={4} className="g-4">
      {nasaData.map((item, index) => (
        <Col key={index} className="mb-4">
          <Card style={{ height: '100%', background: 'rgba(255, 255, 255, 0.7)' }}>
            <Card.Img
              variant="top"
              src={item.hdurl}
              alt={item.title}
              style={{ height: '60%', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-truncate" style={{ fontSize: '1.2rem' }}>{item.title}</h5>
                <small className="text-muted">{new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</small>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <button className="btn btn-primary">
                  <Link to={`/more-info/${item.title}`} style={{ color: 'white', textDecoration: 'none' }}>
                    More Info
                  </Link>
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleFavoriteClick(item.title)}
                >
                  <FaRegGrinHearts style={{ background: 'none', color: 'red' }} />
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Home;

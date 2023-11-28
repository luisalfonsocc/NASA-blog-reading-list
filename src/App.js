// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';

import { MdDelete } from 'react-icons/md';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Home';
import MoreInfo from './MoreInfo';
import Footer from './Footer';
import NasaLogo from './NasaLogo.png'

const App = () => {
 
  const [nasaData, setNasaData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const fetchDataForMonth = () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const requests = Array.from({ length: 8 }, (_, index) => {
          const day = currentDate.getDate() - index;
          const formattedDate = `${currentYear}-${currentMonth + 1}-${day}`;
          const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=zaHaKF1vgL4TzjY8JMAhqpG1iQNQdgPaQS14Ha3P&date=${formattedDate}`;
          return fetch(apiUrl).then(response => response.json());
        });

        Promise.all(requests)
          .then(responses => {
            const sortedResponses = responses.sort((a, b) => new Date(b.date) - new Date(a.date));
            setNasaData(sortedResponses);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataForMonth();
  }, []);

 
  const handleFavoriteClick = (title) => {
    if (!favorites.some(favorite => favorite.title === title)) {
      setFavorites([...favorites, { title, id: Date.now() }]);
    }
  };


  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(favItem => favItem.id !== id);
    setFavorites(updatedFavorites);
  };

  
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar bg="dark" variant="dark" expand="lg" style={{ borderBottom: '2px solid red' }}>
          <Container>
           <Navbar.Brand>
              <Image
                src={NasaLogo}
                alt="NASA Logo"
                fluid
                className="img-fluid custom-logo"
                style={{ width: '60%', maxWidth: '200px' }}
              />

              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                <button className="btn btn-outline-danger ms-3">Home</button>
              </Link>
            </Navbar.Brand>

 
            <Nav className="ms-2 me-auto">
              <NavDropdown title="Favorites" id="basic-nav-dropdown" className="dropdown-menu-end">
                {favorites.map((favItem) => (
                  <NavDropdown.Item key={favItem.id}>
                    {favItem.title}
                    <MdDelete
                      className="ml-2"
                      style={{ background: 'none', color: 'black', cursor: 'pointer' }}
                      onClick={() => handleRemoveFavorite(favItem.id)}
                    />
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Home nasaData={nasaData} handleFavoriteClick={handleFavoriteClick} />} />
            <Route path="/more-info/:id" element={<MoreInfo nasaData={nasaData} />} />
          </Routes>
        </Container>

        <div style={{ flex: 1 }}></div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
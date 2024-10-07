import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  return (
    <Navbar expand="lg" style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 2rem',
      width: '100%',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}>
      <Navbar.Brand 
        href="/" 
        style={{
          color: '#ecf0f1',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          cursor: 'pointer',
        }}
      >
        ST★K
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: '#ecf0f1' }} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" style={{ marginLeft: 'auto' }}>
          {!token && (
            <Nav.Link 
              href="/login" 
              style={{
                color: '#ecf0f1',
                marginRight: '1rem',
                fontWeight: '500',
                fontSize: '1.1rem',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#3498db')}
              onMouseLeave={(e) => (e.target.style.color = '#ecf0f1')}
            >
              Login
            </Nav.Link>
          )}
          {!token && (
            <Nav.Link 
              href="/register" 
              style={{
                color: '#ecf0f1',
                fontWeight: '500',
                fontSize: '1.1rem',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#3498db')}
              onMouseLeave={(e) => (e.target.style.color = '#ecf0f1')}
            >
              Register
            </Nav.Link>
          )}
          {token && (
            <Nav.Link 
              onClick={handleLogout} 
              style={{
                color: '#ecf0f1',
                fontWeight: '500',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#e74c3c')}
              onMouseLeave={(e) => (e.target.style.color = '#ecf0f1')}
            >
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
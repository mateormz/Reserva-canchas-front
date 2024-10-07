// RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../services/api';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchRegister(name, email, password, phoneNumber);
      localStorage.setItem('id', response.id);
      navigate('/login');
      console.log(response.id);
    } catch (error) {
      console.log(error);
      setError('Error durante el registro');
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Row
        style={{
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Col>
          <h2 style={{ textAlign: 'center', color: '#33fff0', marginBottom: '1.5rem' }}>
            Reserva de canchas
          </h2>
          {error && (
            <Alert variant="danger" style={{ textAlign: 'center' }}>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleRegister}>
            <Form.Group style={{ marginBottom: '1rem' }}>
              <Form.Control
                type="text"
                placeholder="Nombre"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #dcdfe6',
                  borderRadius: '4px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3498db')}
                onBlur={(e) => (e.target.style.borderColor = '#dcdfe6')}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '1rem' }}>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #dcdfe6',
                  borderRadius: '4px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3498db')}
                onBlur={(e) => (e.target.style.borderColor = '#dcdfe6')}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '1rem' }}>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #dcdfe6',
                  borderRadius: '4px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3498db')}
                onBlur={(e) => (e.target.style.borderColor = '#dcdfe6')}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '1rem' }}>
              <Form.Control
                type="text"
                placeholder="Teléfono"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #dcdfe6',
                  borderRadius: '4px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3498db')}
                onBlur={(e) => (e.target.style.borderColor = '#dcdfe6')}
              />
            </Form.Group>
            <Button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#3498db',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
            >
              Registrar
            </Button>
          </Form>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ color: '#7f8c8d' }}>¿Ya tienes una cuenta?</span>{' '}
            <Button
              variant="link"
              style={{
                color: '#3498db',
                textDecoration: 'none',
                fontWeight: 'bold',
                padding: '0',
                border: 'none',
              }}
              onClick={() => navigate('/login')}
            >
              Inicia sesión aquí.
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
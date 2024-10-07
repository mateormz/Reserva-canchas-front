import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../services/api';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchLogin(username, password);
      localStorage.setItem('id', response.id);
      navigate('/dashboard');
    } catch (error) {
      setError('Error durante el inicio de sesión');
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
          <Form onSubmit={handleSubmit}>
            <Form.Group style={{ marginBottom: '1rem' }}>
              <Form.Control
                type="email"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
                placeholder="Password"
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
              Sign In
            </Button>
          </Form>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ color: '#7f8c8d' }}>Don't have an account?</span>{' '}
            <Button
              variant="link"
              style={{
                color: '#3498db',
                textDecoration: 'none',
                fontWeight: 'bold',
                padding: '0',
                border: 'none',
              }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
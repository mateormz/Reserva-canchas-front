import React, { useEffect, useState } from 'react';
import { fetchReservations } from '../services/api'; // Asegúrate de que la ruta sea correcta
import { Container, Row, Col, Alert } from 'react-bootstrap';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const data = await fetchReservations(); // Llama a la función para obtener las reservas
        setReservations(data); // Actualiza el estado con las reservas obtenidas
      } catch (error) {
        setError('Error al obtener las reservas'); // Maneja el error
      }
    };

    getReservations();
  }, []); // Ejecutar solo al montar el componente

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
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <Col>
          <h2 style={{ textAlign: 'center', color: '#33fff0', marginBottom: '1.5rem' }}>
            Lista de Reservas
          </h2>
          {error && (
            <Alert variant="danger" style={{ textAlign: 'center' }}>
              {error}
            </Alert>
          )}
          {reservations.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No hay reservas disponibles.</p>
          ) : (
            reservations.map((reservation) => (
              <Row
                key={reservation.id}
                style={{
                  margin: '0.5rem 0',
                  padding: '1rem',
                  border: '1px solid #dcdfe6',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Col xs={3} style={{ color: '#2c3e50' }}>
                  <strong>Usuario:</strong> {reservation.user}
                </Col>
                <Col xs={3}>
                  <strong>Campo:</strong> {reservation.field}
                </Col>
                <Col xs={3}>
                  <strong>Fecha:</strong> {new Date(reservation.zonedatetime).toLocaleDateString()}
                </Col>
                <Col xs={3}>
                  <strong>Hora:</strong> {new Date(reservation.zonedatetime).toLocaleTimeString()}
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Reservations;
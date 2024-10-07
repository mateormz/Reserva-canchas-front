import React, { useEffect, useState } from 'react';
import { fetchReservations, fetchReservationDetails } from '../services/api'; // Asegúrate de que las rutas sean correctas
import { Container, Row, Col, Alert, Button, Modal } from 'react-bootstrap';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

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

  const handleDetailsClick = async (id) => {
    try {
      const details = await fetchReservationDetails(id); // Llama a la API para obtener los detalles
      setReservationDetails(details);
      setShowModal(true); // Muestra el modal con los detalles
    } catch (error) {
      setError('Error al obtener los detalles de la reserva');
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
            reservations.map((reservation, index) => (
              <Row
                key={index}
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
                  <Button variant="info" onClick={() => handleDetailsClick(reservation.id)}>
                    Ver Detalles
                  </Button>
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>

      {/* Modal para mostrar los detalles de la reserva */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservationDetails ? (
            <div>
              <h5>Reserva:</h5>
              <p><strong>ID:</strong> {reservationDetails.reservation.id}</p>
              <p><strong>Usuario:</strong> {reservationDetails.user.name}</p>
              <p><strong>Campo:</strong> {reservationDetails.field.name}</p>
              <p><strong>Fecha:</strong> {new Date(reservationDetails.reservation.zonedatetime).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {new Date(reservationDetails.reservation.zonedatetime).toLocaleTimeString()}</p>
            </div>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Reservations;
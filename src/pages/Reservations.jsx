import React, { useEffect, useState } from 'react';
import { fetchReservations, fetchReservationDetails } from '../services/api';
import { Container, Row, Col, Alert, Button, Modal } from 'react-bootstrap';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        setError('Error al obtener las reservas');
      }
    };

    getReservations();
  }, []);

  const handleDetailsClick = async (_id) => {
    try {
      console.log(_id);
      const details = await fetchReservationDetails(_id);
      setReservationDetails(details);
      setShowModal(true);
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
                  <strong>Usuario: </strong> {reservation.user}
                </Col>
                <Col xs={3}>
                  <strong>Campo: </strong> {reservation.field}
                </Col>
                <Col xs={3}>
                  <strong>Fecha: </strong> {new Date(reservation.zonedatetime).toLocaleDateString()}
                </Col>
                <Col xs={3}>
                  <Button variant="info" onClick={() => handleDetailsClick(reservation._id)}>
                    Ver Detalles
                  </Button>
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>

      {/* Modal centrado con fondo oscuro */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        size="lg"
        animation={true}
      >
        <Modal.Body style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#3f494c' }}>
          {reservationDetails ? (
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#33fff0' }}>Detalles de la Reserva</p>
              <p><strong>ID:</strong> {reservationDetails.reservation._id}</p>
              <p><strong>Usuario:</strong> {reservationDetails.user.name}</p>
              <p><strong>Campo:</strong> {reservationDetails.field.name}</p>
              <p><strong>Fecha:</strong> {new Date(reservationDetails.reservation.zonedatetime).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {new Date(reservationDetails.reservation.zonedatetime).toLocaleTimeString()}</p>
            </div>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Reservations;
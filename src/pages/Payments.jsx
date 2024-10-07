import React, { useEffect, useState } from 'react';
import { fetchPagos } from '../services/api'; // Asegúrate de que la ruta sea correcta
import { Container, Row, Col, Alert } from 'react-bootstrap';

const Payments = () => {
  const [pagos, setPagos] = useState([]); // Estado para los pagos
  const [error, setError] = useState(null); // Estado para los errores

  useEffect(() => {
    const getPagos = async () => {
      try {
        const data = await fetchPagos(); // Llama a la función para obtener los pagos
        setPagos(data); // Actualiza el estado con los pagos obtenidos
      } catch (error) {
        setError('Error al obtener los pagos'); // Maneja el error
      }
    };

    getPagos();
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
            Lista de Pagos
          </h2>
          {error && (
            <Alert variant="danger" style={{ textAlign: 'center' }}>
              {error}
            </Alert>
          )}
          {pagos.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No hay pagos disponibles.</p>
          ) : (
            pagos.map((pago) => (
              <Row
                key={pago.id}
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
                  <strong>Monto:</strong> ${pago.amount}
                </Col>
                <Col xs={3}>
                  <strong>Estado:</strong> {pago.status}
                </Col>
                <Col xs={3}>
                  <strong>Método de pago:</strong> {pago.paymentMethod}
                </Col>
                <Col xs={3}>
                  <strong>Reserva:</strong> {pago.reserva}
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Payments;

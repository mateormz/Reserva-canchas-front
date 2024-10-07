import React, { useEffect, useState } from 'react';
import { fetchFields, fetchTimeslotsByField } from '../services/api'; // Asegúrate de que la ruta sea correcta
import { Container, Row, Col, Alert, Button, Collapse } from 'react-bootstrap';

const Fields = () => {
  const [fields, setFields] = useState([]); // Estado para las canchas
  const [error, setError] = useState(null);
  const [timeslots, setTimeslots] = useState({}); // Estado para los timeslots

  useEffect(() => {
    const getFields = async () => {
      try {
        const data = await fetchFields(); // Llama a la función para obtener los campos
        setFields(data); // Actualiza el estado con los campos obtenidos
      } catch (error) {
        setError('Error al obtener los campos'); // Maneja el error
      }
    };

    getFields();
  }, []); // Ejecutar solo al montar el componente

  // Función para obtener los timeslots de un campo específico
  const handleFetchTimeslots = async (fieldId) => {
    try {
      const timeslotData = await fetchTimeslotsByField(fieldId);
      setTimeslots((prev) => ({ ...prev, [fieldId]: timeslotData }));
    } catch (error) {
      setError(`Error al obtener los timeslots para la cancha ${fieldId}`);
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
            Lista de Canchas
          </h2>
          {error && (
            <Alert variant="danger" style={{ textAlign: 'center' }}>
              {error}
            </Alert>
          )}
          {fields.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No hay canchas disponibles.</p>
          ) : (
            fields.map((field) => (
              <Row
                key={field.id}
                style={{
                  margin: '0.5rem 0',
                  padding: '1rem',
                  border: '1px solid #dcdfe6',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between', // Espacio entre los elementos
                }}
              >
                <Col xs={3} style={{ color: '#2c3e50' }}>
                  <strong>Nombre:</strong> {field.name}
                </Col>
                <Col xs={3}>
                  <strong>Capacidad:</strong> {field.capacity}
                </Col>
                <Col xs={3}>
                  <strong>Precio por hora:</strong> ${field.hour_price}
                </Col>
                <Col xs={3}>
                  <strong>Tipo:</strong> {field.type}
                </Col>

                <Col xs={12}>
                  <Button
                    variant="info"
                    onClick={() => handleFetchTimeslots(field.id)}
                    style={{ marginTop: '1rem' }}
                  >
                    Ver timeslots disponibles
                  </Button>
                  {/* Mostrar los timeslots */}
                  {timeslots[field.id] && (
                    <Collapse in={!!timeslots[field.id]}>
                      <div style={{ marginTop: '1rem' }}>
                        <h5>Timeslots disponibles:</h5>
                        {timeslots[field.id].length === 0 ? (
                          <p>No hay timeslots disponibles para esta cancha.</p>
                        ) : (
                          timeslots[field.id].map((slot) => (
                            <div key={slot.id} style={{ marginBottom: '0.5rem' }}>
                              <strong>Fecha:</strong> {new Date(slot.date).toLocaleDateString()} |{' '}
                              <strong>Hora:</strong> {slot.start_time} - {slot.end_time}
                            </div>
                          ))
                        )}
                      </div>
                    </Collapse>
                  )}
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Fields;
import axios from "axios";

const USERAPI = 'http://lb-proyecto-695045040.us-east-1.elb.amazonaws.com:8081';

const FIELDSAPI = 'http://lb-proyecto-695045040.us-east-1.elb.amazonaws.com:8082';

const RESERVATIONSAPI = 'http://lb-proyecto-695045040.us-east-1.elb.amazonaws.com:8000/api/v1';

const PAGOSAPI = 'http://lb-proyecto-695045040.us-east-1.elb.amazonaws.com:3000'

const ORQUESTADOR = "http://lb-proyecto-695045040.us-east-1.elb.amazonaws.com:8080"

export const fetchLogin = async(username, password) => {

    const response = await axios.post(`${USERAPI}/auth/login`, {username, password});

    console.log(response.data);
    return response.data;
}

export const fetchRegister = async (name, email, password, phoneNumber) => {

    const response = await axios.post(`${USERAPI}/auth/register`, { name, email, password, phoneNumber });

    console.log(response.data);
    return response.data;
};

export const fetchFields = async () => {
    try {
        const response = await axios.get(`${FIELDSAPI}/field`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching fields:", error);
        throw error;
    }
};

export const fetchReservations = async () => {
    try {
      const response = await axios.get(`${RESERVATIONSAPI}/reservations`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
};

export const fetchTimeslotsByField = async (fieldId) => {
    try {
        const response = await axios.get(`${RESERVATIONSAPI}/timeslots/${fieldId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching timeslots:", error);
        throw error;
    }
};

export const fetchPagos = async () => {
    try {
      const response = await axios.get(`${PAGOSAPI}/pagos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pagos:', error);
      throw error;
    }
  };

// Orquestador

export const reservationPost = async (reservationRequest) => {
  const response = await fetch(`${ORQUESTADOR}/reserva-con-pago`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationRequest),
  });

  if (!response.ok) {
    throw new Error('Error al crear la reserva y el pago');
  }

  return response.json();
};

export const fetchReservationDetails = async (id) => {
    const response = await fetch(`${ORQUESTADOR}/reservas/detalles/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener los detalles de la reserva');
    }
    return response.json();
};
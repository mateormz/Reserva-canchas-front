import axios from "axios";

const USERAPI = 'http://localhost:8081';

const FIELDSAPI = 'http://localhost:8082';

const RESERVATIONSAPI = 'http://localhost:8000/api/v1';

const PAGOSAPI = 'http://localhost:3000'

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
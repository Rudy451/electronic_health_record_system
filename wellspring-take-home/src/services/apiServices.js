const baseUrl = 'http://localhost:3001/api';

const methods = {
  getPatients: async () => {
    const patient_api_request = await fetch(`${baseUrl}/patients`, {
      method: 'GET',
      headers: {'Content-type': 'application/json'},

    })
    return patient_api_request.json();
  },
  getAppointments: async () => {
    const appointment_api_request = await fetch(`${baseUrl}/appointments`, {
      method: 'GET',
      headers: {'Content-type': 'application/json'},

    })
    return appointment_api_request.json();
  },

}

export default methods;

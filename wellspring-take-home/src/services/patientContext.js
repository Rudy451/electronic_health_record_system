import React, {createContext, useState} from 'react';

// Normally, I will place the context provider below within the parent element
// However, I'm creating context & the provider in one file to facilitate testing & easier maintenance for next hypothetical engineer
const PatientContext = createContext();

const PatientProvider = ({children}) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});

  return (
    <PatientContext.Provider value={{patients, selectedPatient, setPatients, setSelectedPatient}}>
      {children}
    </PatientContext.Provider>
  );
};

export {PatientContext, PatientProvider};

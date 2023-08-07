import React, {useState, useContext} from 'react';
import {Input} from 'semantic-ui-react';
import {PatientContext} from '../../services/patientContext';
import './PatientsTableSearchBar.scss'

const PatientsTableSearchBar = () => {
  const {patients, setPatients} = useContext(PatientContext);
  const [localPatients, setLocalPatients] = useState([]);

  const searchPatients = (e) => {
    if(localPatients.length == 0) {
      setLocalPatients(patients);
    }
    if (e.key == 'Enter') {
      let patientSearchInput = e.target.value;
      if(patientSearchInput.length === 0) {
        setPatients(localPatients);
      } else  {
        let patientFilter = patients.filter((patient) => patient.patientName === patientSearchInput);
        if(patientFilter.length) {
          setPatients(patientFilter);
        }
      }
    }
  }

  return (
    <Input icon='search' placeholder='Search Patients...' onKeyPress={(e) => searchPatients(e)}/>
  )
}

export default PatientsTableSearchBar;

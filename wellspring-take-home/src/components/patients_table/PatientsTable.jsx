import React, {useContext} from 'react';
import {PatientContext} from '../../services/patientContext';
import './PatientsTable.scss';

const PatientsTable = ({props}) => {
  const {patients, setSelectedPatient} = useContext(PatientContext);

  const updateSelectedPatient = (patient) => {
    setSelectedPatient(patient);
  }

  return (
    <div className={`${props.pageType === 'home' ? '' : 'parent-container'}`} data-testid={`${props.pageType === 'home' ? '' : 'parent-container'}`}>
      <div className={`${props.pageType === 'home' ? '' : 'scroll-container'}`} data-testid={`${props.pageType === 'home' ? '' : 'scroll-container'}`}>
        {(props.pageType === 'home' ? patients.slice(0, 6) : patients).map((patient) => (
          <>
            {
              patient.id > 1 ? <hr className='patients-table__hr'></hr> : <div/>
            }
            <li key={patient.id} className={`patients-table ${props.pageType === 'home' ? '' : 'patients-table-patients'}`} data-testid='patients-table' onClick={() => props.pageType === 'home' ? {} : updateSelectedPatient(patient)}>
              <div className='patients-table__patient-column'>
                <div>{patient.patientName}</div>
                <div className='patients-table__patient-column__physician-name'>{patient.caregiverName}</div>
              </div>
              <div className={`patients-table__patient-status__${patient.visitStatus === 'Visit completed' ? 'visit-completed' : patient.visitStatus === 'Started training' ? 'started-training' : 'missing-documentation'}`}>{patient.visitStatus}</div>
            </li>
          </>
        ))}
      </div>

    </div>
  )
};

export default PatientsTable;

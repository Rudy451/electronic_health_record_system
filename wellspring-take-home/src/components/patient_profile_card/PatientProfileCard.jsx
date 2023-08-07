import React, {useContext} from 'react';
import {DateTime} from 'luxon';
import {PatientContext} from '../../services/patientContext';
import './PatientProfileCard.scss';

const PatientsProfileCard = () => {
  const {selectedPatient} = useContext(PatientContext);

  return (
    <div className='patient-profile-card'>
      <div className='patient-profile-card__heading'>
        <div className='patient-profile-card__heading__patient-photo'/>
        <div className='patient-profile-card__heading__patient-name'>{Object.keys(selectedPatient).length ? selectedPatient.patientName : "Patient Name"}</div>
      </div>
      <hr className='patient-profile-card__hr'></hr>
      <div className='patient-profile-card__patient-details'>
        <div>Caregiver Name</div>
        <div className='patient-profile-card__patient-details__container'> {Object.keys(selectedPatient).length ? selectedPatient.caregiverName : "Select Patient"}</div>
      </div>
      <div className='patient-profile-card__patient-details'>
        <div>Visit Status</div>
        <div className='patient-profile-card__patient-details__container'>{Object.keys(selectedPatient).length ? selectedPatient.visitStatus : "Select Patient"}</div>
      </div>
      <div className='patient-profile-card__patient-details'>
        <div>Last Check-In</div>
        <div className='patient-profile-card__patient-details__container'>{Object.keys(selectedPatient).length ? DateTime.fromISO(selectedPatient.lastCheckIn).toFormat('MM/dd/yyyy') : "MM/dd/yyyy"}</div>
      </div>
    </div>
  )
};

export default PatientsProfileCard;

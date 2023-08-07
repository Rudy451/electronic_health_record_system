import React, {useEffect, useState} from 'react';
import methods from '../../services/apiServices';
import './UpcomingVisitsTable.scss';
import dotshorizontal from '../../icons/dots-horizontal.png';

const UpcomingVisitsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentFilterOption, setAppointmentFilterOption] = useState(1);

  useEffect(() => {
    methods.getAppointments().then(appointmentList => {
      let currentDate = new Date();
      let filteredAppointmentList;
      if (appointmentFilterOption === 1) {
        filteredAppointmentList = appointmentList.filter((appointment) => {
          let today = currentDate.getDate();
          let scheduledAppointmentDate = new Date(appointment.appointmentDate).getDate();
          return scheduledAppointmentDate === today;
        });
      } else if (appointmentFilterOption === 2) {
        filteredAppointmentList = appointmentList.filter((appointment) => {
          let tomorrow = currentDate.getDate()+1;
          let scheduledAppointmentDate = new Date(appointment.appointmentDate).getDate();
          return scheduledAppointmentDate === tomorrow;
        });
      } else if (appointmentFilterOption === 3) {
        filteredAppointmentList = appointmentList.filter((appointment) => {
          let scheduledAppointmentDate = new Date(appointment.appointmentDate).getDate();
          let startOfWeek = currentDate.getDate();
          let endOfWeek = currentDate.getDate()+6;
          return (scheduledAppointmentDate >= startOfWeek) && (scheduledAppointmentDate <= endOfWeek);
        });
      }
      setAppointments(filteredAppointmentList);
    }).catch((e) => {
      // Todo => Error popup with explanation
      // Todo => UseRef for date
      console.log('Error:', e.message);
    });
  }, [appointmentFilterOption]);

  const pressButtonToFilterTodaysAppointments = () => {
    setAppointmentFilterOption(1);
  }

  const pressButtonToFilterTomorrowsAppointments = () => {
    setAppointmentFilterOption(2);
  }

  const pressButtonToFilterThisWeeksAppointments = () => {
    setAppointmentFilterOption(3);
  }

  return (
    <div className='upcoming-visits-table'>
      <div className='upcoming-visits-table__button-menu'>
        <button className='upcoming-visits-table__button-menu__tabs' tabIndex="1" onClick={pressButtonToFilterTodaysAppointments}>Today</button>
        <button className='upcoming-visits-table__button-menu__tabs' onClick={pressButtonToFilterTomorrowsAppointments}>Tomorrow</button>
        <button className='upcoming-visits-table__button-menu__tabs' onClick={pressButtonToFilterThisWeeksAppointments}>This Week</button>
      </div>
      {appointments.slice(0, 4).map((appointment) => (
        <>
          <div key={appointment.id} className='upcoming-visits-table__appointment-entry'>
          <div className={`upcoming-visits-table__appointment-entry__logistics-info upcoming-visits-table__appointment-entry__appointment-type-${appointment.appointmentType === 'Telehealth' ? 'telehealth' : 'in-person'}`}>
            <div className='upcoming-visits-table__appointment-entry__logistics-info__arrival-time'>{appointment.time}</div>
            <div className={`upcoming-visits-table__appointment-entry__logistics-info__appointment-type-${appointment.appointmentType === 'Telehealth' ? 'telehealth' : 'in-person'}`}>{appointment.appointmentType}</div>
          </div>
          <div className='upcoming-visits-table__appointment-entry__appointment-info'>
            <div className='upcoming-visits-table__appointment-entry__appointment-info__details'>
              <div className='upcoming-visits-table__appointment-entry__appointment-info__details__patient-name'>{appointment.appointmentName}: {appointment.patientName}</div>
              <div className='upcoming-visits-table__appointment-entry__appointment-info__details__patient-details'>Lorem ipsum dolor sit amet</div>
            </div>
            <img className="upcoming-visits-table__appointment-entry__appointment-info__dots-horizontal" src={dotshorizontal}/>
          </div>
        </div>
        </>
      ))}
    </div>
  )
};

export default UpcomingVisitsTable;

import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import SideNavigationPanel from "../side_navigation_panel/SideNavigationPanel";
import methods from '../../services/apiServices';
import {PatientContext} from '../../services/patientContext';
import './PageLayout.scss';

const PageLayout = () => {
  const {setPatients} = useContext(PatientContext);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientList = await methods.getPatients();
        setPatients(patientList);
      } catch(e) {
        console.log('Error:', e.message);
      }
    }

    // Initial fetch
    fetchPatientData();

    // Cache every ten minutes
    const interval = setInterval(fetchPatientData, 600000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [setPatients]);

  return (
    <div className='page-layout'>
      <SideNavigationPanel/>
      <Outlet/>
    </div>
  )
};

export default PageLayout;

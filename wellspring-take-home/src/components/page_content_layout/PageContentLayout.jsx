import {Link} from 'react-router-dom';
import PatientsTableSearchBar from '../patients_table_searchbar/PatientsTableSearchBar';
import PatientsTable from '../patients_table/PatientsTable';
import UpcomingVisitsTable from '../upcoming_visits_table/UpcomingVisitsTable';
import PatientProfileCard from '../patient_profile_card/PatientProfileCard';
import './PageContentLayout.scss';

const PageContentLayout = (props) => {
  return (
    <div className='page-content-layout'>
      <div className='page-content-layout__greeting'>{props.pageType === 'home' ? 'Good Afternoon, Meredith!' : <PatientsTableSearchBar/>}</div>
      <div className='page-content-layout__patient-information'>
        <div className='page-content-layout__patient-information__container'>
          <div className='page-content-layout__patient-information__container__headings'>
            <div className='page-content-layout__patient-information__container__headings__title'>{props.pageType === 'home' ? 'Recent Patients' : 'All Patients'}</div>
            {props.pageType === 'home' ? <Link className='page-content-layout__patient-information__container__headings__select-all' to={'/patients'}>View All</Link> : <></>}
          </div>
          <hr className='page-content-layout__patient-information__container__hr'></hr>
          <br/>
          <PatientsTable props={props}/>
        </div>
        <div className='page-content-layout__patient-information__container'>
          <div className='page-content-layout__patient-information__container__headings'>
            <div className='page-content-layout__patient-information__container__headings__title'>{props.pageType === 'home' ? 'Upcoming Visits' : 'Patient Profile'}</div>
            <div/>
          </div>
          <hr className='page-content-layout__patient-information__container__hr'></hr>
          <br/>
          {props.pageType === 'home' ? <UpcomingVisitsTable/> : <PatientProfileCard/>}
        </div>
      </div>
    </div>
  )
};

export default PageContentLayout;

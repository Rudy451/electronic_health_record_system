import { render, screen} from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import React from 'react';
import PageLayout from './components/page_layout/PageLayout';
import PageContentLayout from './components/page_content_layout/PageContentLayout';
import {PatientProvider} from './services/patientContext';
import methods from './services/apiServices';

jest.mock('./components/side_navigation_panel/SideNavigationPanel', () => () => <div data-testid="side_navigation_panel">Sidebar Component</div>);
jest.mock('./components/patients_table/PatientsTable', () => () => <div data-testid="patients_table">PatientsTable Component</div>);
jest.mock('./components/upcoming_visits_table/UpcomingVisitsTable', () => () => <div data-testid="upcoming_visits_table">UpcomingVisitsTable Component</div>);
jest.mock('./components/patients_table_searchbar/PatientsTableSearchBar', () => () => <div data-testid="patients_table_searchbar">PatientsTableSearchBar Component</div>);
jest.mock('./components/patient_profile_card/PatientProfileCard', () => () => <div data-testid="patient_profile_card">PatientProfileCard Component</div>);

let patientData = null;

// Note: Wrapping all components with MemoryRouter to ensure any link component within its parent can be run in browserless environment
beforeEach(() => {
  patientData = {
    caregiverName: "caregiverName",
    id: 1,
    lastCheckIn: "2023-04-19",
    patientName: "patientName",
    visitStatus: "Visit completed",
  }

});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

// Mock Page Layout
test('renders Page Layout', async () => {
  // Confirm PageLayout component renders correctly
  render(
    <PatientProvider>
        <PageLayout/>
    </PatientProvider>
  );

  // Confirm patient data fetch is completed when PageLayout renders
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(patientData),
  });


  const apiCallResult = await methods.getPatients();
  expect(apiCallResult).toEqual(patientData);
  expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/api/patients', {'headers': {'Content-type': 'application/json'}, 'method': 'GET'});
  expect(fetchMock).toHaveBeenCalledTimes(1);

  // Test that Side Navigation Panel Component is in the document
  const sideNavigationPanelComponent = screen.getByTestId('side_navigation_panel');
  expect(sideNavigationPanelComponent).toBeInTheDocument();
});

// Mock Side Navigation Panel
test('renders Side Navigation Panel', () => {
  jest.unmock('./components/side_navigation_panel/SideNavigationPanel');
  const SideNavigationPanel = require('./components/side_navigation_panel/SideNavigationPanel').default;

  render(
    <PatientProvider>
      <MemoryRouter>
        <SideNavigationPanel/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Confirm Home & Patients test within the document
  const homeTabText = screen.getByText('Home');
  const patientTabText = screen.getByText('Patients');
  expect(homeTabText).toBeInTheDocument();
  expect(patientTabText).toBeInTheDocument();

  // Test for active element
  //const activateTab = container.getByTestId('1');
  //fireEvent.click(activateTab);
  //expect(activateTab.find('.active')).toBeTruthy();
});


// Mock Page Content Layout (Home Page)
test('renders Page Content Layout (Home Page)', () => {
  render(
    <PatientProvider>
      <MemoryRouter>
        <PageContentLayout pageType='home'/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Test that proper text & components are in the document
  const userGreetingText = screen.getByText('Good Afternoon, Meredith!');
  const recentPatients = screen.getByText('Recent Patients');
  const upcomingVisits = screen.getByText('Upcoming Visits');
  const upcomingVisitsTableComponent = screen.getByTestId('upcoming_visits_table')
  expect(userGreetingText).toBeInTheDocument();
  expect(recentPatients).toBeInTheDocument();
  expect(upcomingVisits).toBeInTheDocument();
  expect(upcomingVisitsTableComponent).toBeInTheDocument();
});

// Mock Page Content Layout (Patients Page)
test('renders Page Content Layout (Patients Page)', () => {
  render(
    <PatientProvider>
      <MemoryRouter>
        <PageContentLayout pageType='patient'/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Test that proper text & components are in the document
  const allPatients = screen.getByText('All Patients');
  const patientProfile = screen.getByText('Patient Profile');
  const patientsTableSearchbarComponent = screen.getByTestId('patients_table_searchbar')
  const patientProfileCardComponent = screen.getByTestId('patient_profile_card')
  expect(allPatients).toBeInTheDocument();
  expect(patientProfile).toBeInTheDocument();
  expect(patientsTableSearchbarComponent).toBeInTheDocument();
  expect(patientProfileCardComponent).toBeInTheDocument();
});

// Mock Patients Table (Home Page)
test('renders Patients Table (Home Page)', async () => {
  jest.unmock('./components/patients_table/PatientsTable');
  const PatientsTable = require('./components/patients_table/PatientsTable').default;
  const pageType = {'pageType': 'home'};

  render(
    <PatientProvider>
      <MemoryRouter>
        <PatientsTable props={pageType}/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Test that proper text & components are in the document
  const patientContainer = screen.queryByTestId('parent-container');
  const scrollContainer = screen.queryByTestId('scroll-container');
  expect(patientContainer).toBeNull();
  expect(scrollContainer).toBeNull();
  // To-Do check context & number of children
});

// Mock Upcoming Visits Table
test('renders Upcoming Visits Table', () => {
  jest.unmock('./components/upcoming_visits_table/UpcomingVisitsTable');
  const UpcomingVisitsTable = require('./components/upcoming_visits_table/UpcomingVisitsTable').default;

  render(
    <PatientProvider>
      <MemoryRouter>
        <UpcomingVisitsTable/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Test that proper text & components are in the document
  const todayTabText = screen.getByText('Today');
  const tomorrowTabText = screen.getByText('Tomorrow');
  const thisWeekTabText = screen.getByText('This Week');
  //const fakeText = screen.getByText('Lorem ipsum dolor sit amet')
  expect(todayTabText).toBeInTheDocument();
  expect(tomorrowTabText).toBeInTheDocument();
  expect(thisWeekTabText).toBeInTheDocument();
  //expect(fakeText).toBeInTheDocument();
});


// Mock Patient Table Searchbar
test('renders Patient Table Searchbar', () => {
  jest.unmock('./components/patients_table_searchbar/PatientsTableSearchBar');
  const PatientsTableSearchBar = require('./components/patients_table_searchbar/PatientsTableSearchBar').default;

  render(
    <PatientProvider>
      <MemoryRouter>
        <PatientsTableSearchBar/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Test that proper text & components are in the document
  const searchInputText = screen.getByPlaceholderText('Search Patients...');
  expect(searchInputText.placeholder).toBe('Search Patients...');

  // const searchPatientsMock = jest.fn();
  // PatientsTableSearchBar.searchPatients = searchPatientsMock;
});


// Mock Patients Table (Patients Page)
test('renders Patients Table (Patients Page)', () => {
  jest.unmock('./components/patients_table/PatientsTable');
  const PatientsTable = require('./components/patients_table/PatientsTable').default;
  const pageType = {'pageType': 'patient'};

  render(
    <PatientProvider>
      <MemoryRouter>
        <PatientsTable props={pageType}/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Test that proper text & components are in the document
  const patientContainer = screen.queryByTestId('parent-container');
  const scrollContainer = screen.queryByTestId('scroll-container');
  expect(patientContainer).toBeInTheDocument();
  expect(scrollContainer).toBeInTheDocument();
});


// Mock Patient Profile Card
test('renders Profile Card', () => {
  jest.unmock('./components/patient_profile_card/PatientProfileCard');
  const PatientProfileCard = require('./components/patient_profile_card/PatientProfileCard').default;

  render(
    <PatientProvider>
      <MemoryRouter>
        <PatientProfileCard/>
      </MemoryRouter>
    </PatientProvider>
  );

  // Test that proper text & components are in the document
  // Confirm Home & Patients test within the document
  const caregiverNameText = screen.getByText('Caregiver Name');
  const visitStatusText = screen.getByText('Visit Status');
  const lastCheckInText = screen.getByText('Last Check-In')
  expect(caregiverNameText).toBeInTheDocument();
  expect(visitStatusText).toBeInTheDocument();
  expect(lastCheckInText).toBeInTheDocument();
});

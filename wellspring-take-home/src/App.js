import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {PatientProvider} from './services/patientContext';
import PageLayout from "./components/page_layout/PageLayout";
import PageContentLayout from "./components/page_content_layout/PageContentLayout"

// Decided that reusing same component for home & patients page better for UI & code reusability
// Props will determine page type & content within the component (See PageContentLayout.jsx)
const HomePageLayout = () => {
  return <PageContentLayout pageType='home'/>
}

const PatientsPageLayout = () => {
  return <PageContentLayout pageType='patients'/>
}

function App() {
  return (
    <PatientProvider>
      <BrowserRouter future={{v7_startTransition: true}}>
        <Routes>
          <Route path="/" element={<PageLayout/>}>
            {/*Renders at parents (PageLayout) Outlet component*/}
            <Route index element={<HomePageLayout/>}/>
            <Route path="/home" element={<HomePageLayout/>}/>
            <Route path="/patients" element={<PatientsPageLayout/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
    </PatientProvider>
  );
}

export default App;

import { Routes,Route,Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import HomePage from './Pages/HomePage/HomePage';
import { UserContext, UserContextProvider } from './Context/UserContext';
import EditHeroPage from './Pages/EditHeroPage/EditHeroPage';
import EditAboutPage from './Pages/EditAboutPage/EditAboutPage';
import EditSkillsPage from './Pages/EditSkillsPage/EditSkillsPage';
import EditExperiencePage from './Pages/EditExperiencePage/EditExperiencePage';
import EditProjectsPage from './Pages/EditProjectsPage/EditProjectsPage';
import EditCertificationsPage from './Pages/EditCertificationsPage/EditCertificationsPage';
import EditBlogsPage from './Pages/EditBlogsPage/EditBlogsPage';
import Navbar from './Components/Navbar/Navbar';
import {useLocation} from 'react-router-dom';
import AddEducation from './Pages/AddEducation/AddEducation';
import EditEducation from './Pages/EditEducation/EditEducation';
import AddExperience from './Pages/AddExperience/AddExperience';
import EditExperience from './Pages/EditExperience/EditExperience';
import AddProject from './Pages/AddProject/AddProject';
import EditProject from './Pages/EditProject/EditProject'
import AddCertification from './Pages/AddCertification/AddCertification';
import EditCertification from './Pages/EditCertification/EditCertification';
import EditContactPage from './Pages/EditContactPage/EditContactPage';


function App() {

  const location = useLocation();
  const showNavbar = !['/login', '/register','/userLogin','/userRegister'].includes(location.pathname);
  
  return (
    <UserContextProvider>
      {showNavbar && <Navbar></Navbar>}
      <Routes>
        <Route exact path='/' element={<HomePage></HomePage>}></Route>
        <Route exact path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route exact path='/register' element={<RegisterPage></RegisterPage>}></Route>
        <Route exact path='/hero' element={<EditHeroPage></EditHeroPage>}></Route>

        <Route exact path='/about' element={<EditAboutPage></EditAboutPage>}></Route>
        <Route exact path='/about/add' element={<AddEducation></AddEducation>}></Route>
        <Route exact path='/about/edit' element={<EditEducation></EditEducation>}></Route>

        <Route exact path='/skills' element={<EditSkillsPage></EditSkillsPage>}></Route>

        <Route exact path='/experience' element={<EditExperiencePage></EditExperiencePage>}></Route>
        <Route exact path='/experience/add' element={<AddExperience></AddExperience>}></Route>
        <Route exact path='/experience/edit' element={<EditExperience></EditExperience>}></Route>

        <Route exact path='/projects' element={<EditProjectsPage></EditProjectsPage>}></Route>
        <Route  exact path='/projects/add' element={<AddProject></AddProject>}></Route>
        <Route  exact path='/projects/edit' element={<EditProject></EditProject>}></Route>
        
        <Route exact path='/certifications' element={<EditCertificationsPage></EditCertificationsPage>}></Route>
        <Route  exact path='/certifications/add' element={<AddCertification></AddCertification>}></Route>
        <Route  exact path='/certifications/edit' element={<EditCertification></EditCertification>}></Route>

        <Route exact path='/contact' element={<EditContactPage></EditContactPage>}></Route>
        <Route exact path='/blogs' element={<EditBlogsPage></EditBlogsPage>}></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

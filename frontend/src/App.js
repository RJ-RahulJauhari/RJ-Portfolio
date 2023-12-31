import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import SkillsPage from './Pages/SkillsPage/SkillsPage';
import ExperiencePage from './Pages/ExperiencePage/ExperiencePage';
import ProjectPage from './Pages/ProjectsPage/ProjectPage';
import CertificationPage from './Pages/CertificationsPage/CertificationPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import Navbar from './Components/Navbar/Navbar';
import { HeroContextProvider } from './Context/HeroContext';
import ViewProjectPage from './Pages/ViewProjectPage/ViewProjectPage';

function App() {
  return (
    <HeroContextProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/about' element={<AboutPage></AboutPage>}></Route>
        <Route path='/skills' element={<SkillsPage></SkillsPage>}></Route>
        <Route path='/experiences' element={<ExperiencePage></ExperiencePage>}></Route>
        <Route path='/projects' element={<ProjectPage></ProjectPage>}></Route>
        <Route path='/projects/:id' element={<ViewProjectPage></ViewProjectPage>}></Route>
        <Route path='/certifications' element={<CertificationPage></CertificationPage>}></Route>
        <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
      </Routes>
    </HeroContextProvider>
  );
}

export default App;

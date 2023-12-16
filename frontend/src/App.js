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

function App() {
  return (
    <HeroContextProvider>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<HomePage></HomePage>}></Route>
        <Route exact path='/about' element={<AboutPage></AboutPage>}></Route>
        <Route exact path='/skills' element={<SkillsPage></SkillsPage>}></Route>
        <Route exact path='/experiences' element={<ExperiencePage></ExperiencePage>}></Route>
        <Route exact path='/projects' element={<ProjectPage></ProjectPage>}></Route>
        <Route exact path='/certifications' element={<CertificationPage></CertificationPage>}></Route>
        <Route exact path='/contact' element={<ContactPage></ContactPage>}></Route>
      </Routes>
    </HeroContextProvider>
  );
}

export default App;

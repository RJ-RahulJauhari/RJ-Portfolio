import React from 'react'
import './HomePage.scss'
import HeroPage from '../HeroPage/HeroPage'
import AboutPage from '../AboutPage/AboutPage'
import SkillsPage from '../SkillsPage/SkillsPage'
import ExperiencePage from '../ExperiencePage/ExperiencePage'
import ProjectPage from '../ProjectsPage/ProjectPage'
import CertificationPage from '../CertificationsPage/CertificationPage'
import {useLocation} from 'react-router-dom'
import ContactPage from '../ContactPage/ContactPage'

const HomePage = () => {

  const page = useLocation().pathname.substring(1);

  return (
    <div>
      <HeroPage></HeroPage>
      <AboutPage></AboutPage>
      <SkillsPage></SkillsPage>
      <ExperiencePage></ExperiencePage>
      <ProjectPage></ProjectPage>
      <CertificationPage></CertificationPage>
      <ContactPage></ContactPage>
    </div>
  )
}

export default HomePage

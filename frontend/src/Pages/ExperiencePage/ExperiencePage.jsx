import React, { useContext } from 'react'
import './ExperiencePage.scss'
import ExperienceCard from '../../Components/ExperienceCard/ExperienceCard'
import { HeroContext } from '../../Context/HeroContext'
import {useLocation} from 'react-router-dom'

const ExperiencePage = () => {

  const {experiences} = useContext(HeroContext);
  const page = useLocation().pathname.substring(1);
  
  return (
    <div className='experience-page full-width full-height'>
      {
        page === 'experiences'
        ?<div className='spacer'></div>
        :  <p className='title scale-up'>Experiences <br /> <span className='caption'>Have a look at my experiences</span></p>
      }
      <div className='experience-card-container'>
        {
          experiences
          ? experiences.map((item,index) => {
            return <ExperienceCard key={index} props={item}></ExperienceCard>
          })
          : <p>No experience found</p>
        }
      </div>
    </div>
  )
}

export default ExperiencePage

import React, { useContext, useEffect } from 'react'
import './AboutPage.scss'
import { HeroContext } from '../../Context/HeroContext'
import EducationCard from '../../Components/EducationCard/EducationCard';
import {useLocation} from 'react-router-dom'

const AboutPage = () => {
  const {hero,education} = useContext(HeroContext);
  const page = useLocation().pathname.substring(1);

  if(hero && education){
    return (
      <div className='about-page full-width'>
        
        {
        page === 'about'
        ?<div className='spacer'></div>
        :  <p className='title scale-up'>My Journey <br /><span className='caption'>Get to know where it all started</span></p>
        }
        <div className='about-container gap3'>
          <div className='about-left flex1'>
            <h1 className='heading'>About Me</h1>
            <p className='description wrapable-text'>{hero.description}</p>
          </div>
          <div className='about-right flex1 gap3'>
            <h1 className='heading'>Education</h1>
            {
              education
              ? education.map((item,index) => {
                return <EducationCard key={item._id} props={item}></EducationCard>
              })
              : <p>Education not found</p>
            }
          </div>
        </div>
      </div>
    )
  }else{
    return (
      <div>
        Something went Wrong
      </div>
    )
  }
}

export default AboutPage

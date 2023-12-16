import React, { useContext, useEffect, useState } from 'react'
import './SkillsPage.scss'
import SkillsCard from '../../Components/SkillsCard/SkillsCard'
import { HeroContext } from '../../Context/HeroContext'
import axios from 'axios'
import { BASE_URL } from '../../url'
import {useLocation} from 'react-router-dom'

const SkillsPage = () => {

  const [skills,setSkills] = useState([]);
  const {hero} = useContext(HeroContext);
  const page = useLocation().pathname.substring(1);

  useEffect(() => {
    if(hero){
      getSkills()
    }
  },[hero])

  const getSkills = async () => {
    try {
        await axios.get(`${BASE_URL}/skills/getUserSkills?id=${hero?hero._id:''}`)
        .then(async (res) => {
            const data = res.data;
            if(data){
                await setSkills([...data])
            }
        })
    } catch (error) {
        console.log(error)
    }
}

  
  return (
    <div className='skills-page full-width full-height'>
        
        {
        page === 'skills'
        ?<div className='spacer'></div>
        :  <p className='title scale-up'>Skills <br /> <span className='caption full-width'>Have a look at some of my skills</span></p>
        }
      {
        skills
        ? 
        <div className='skill-cards-container'>
          <SkillsCard name={'Programming Languages'} skills={skills.filter(skill => skill['category'] === 'programminglanguage')}></SkillsCard>
          <SkillsCard name={'Frontend'} skills={skills.filter(skill => skill['category'] === 'frontend')}></SkillsCard>
          <SkillsCard name={'Backend'} skills={skills.filter(skill => skill['category'] === 'backend')}></SkillsCard>
          <SkillsCard name={'Frameworks'} skills={skills.filter(skill => skill['category'] === 'framework')}></SkillsCard>
          <SkillsCard name={'Other Skills'} skills={skills.filter(skill => skill['category'] === 'others')}></SkillsCard>
        </div>
        : <p>No Skills Found</p>
      }

    </div>
  )
}

export default SkillsPage

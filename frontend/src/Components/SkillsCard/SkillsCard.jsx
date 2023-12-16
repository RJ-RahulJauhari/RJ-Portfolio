import React from 'react'
import './SkillsCard.scss'
import SkillsTag from '../SkillsTag/SkillsTag'

const SkillsCard = ({name,skills}) => {
  return (
    <div className='skills-card card-border'>
        <p className='sub-heading'>{name}</p>
        <div className='skills-container full-width'>
            {
                skills
                ? skills.map((item,index) => {
                    return <SkillsTag key={index} tag={item.skill}></SkillsTag>
                })
                : <p>No skills for {name}</p>
            }
        </div>
    </div>
  )
}

export default SkillsCard

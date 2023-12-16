import React from 'react'
import './ProjectCard.scss'
import ExperienceSkillTag from '../../Components/ExperienceSkillTag/ExperienceSkillTag'

const ProjectCard = ({props,id,func}) => {

  return (
    <div onClick={() => {func(id)}} className='project-card scale-up'>
        <img className='logo' src={props.logoUrl} alt="Logo" />
        <div className='card-body flex1'>
            <div className='heading'>
                <h2>{props.title}</h2>
            </div>
            <div className='project-info'>
                <div className='space-out-h'>
                    <p className='category'>{props.category}</p>
                    <p className='date'>{props.startDate} - {props.endDate}</p>
                </div>
                <p className='description'>{props.shortDescription}</p>
            </div>
            <div className='project-skills'>
                <h3>Skills Used</h3>
                <div className='skills-container'>
                    {
                        (props.skillsUsed).map((item,index) => {
                            return <ExperienceSkillTag key={index} tag={item} color="red"></ExperienceSkillTag>
                        })
                    }
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ProjectCard

import React from 'react'
import './ProjectCard.scss'
import Tag from '../Tag/Tag.jsx'
import SkillsTag from '../SkillsTag/SkillsTag'
import { SocialIcon } from 'react-social-icons'
import Icon from '../Icon/Icon.jsx'
import {useLocation,useNavigate} from 'react-router-dom'

const ProjectCard = ({props}) => {
  const navigate = useNavigate();
  return (
    <div className='project-card scale-up elevated-card'>
      <div className='logo'>
        <img src={props.logoUrl} alt="project-logo" />
      </div>
      <p className='project-title'>{props.title}</p>
      <div onClick={() => {navigate(`/projects/${props._id}`)}} className='card-body '>
        <div className="project-details ">
            <Tag tag={props.category}></Tag>
            <p className='duration'>{new Date(props.startDate).toDateString()} - {new Date(props.endDate).toDateString()}</p>
            <p className='description'>{props.shortDescription}</p>
        </div>
        <div className='extras'>
          <p className='project-link-text'>Project Links</p>
          <div className='icon-container'>
              {
                  props.deploymentUrl
                  ? <Icon iconUrl={props.logoUrl} url={props.deploymentUrl}></Icon>
                  : "" 
              }
              {
                  props.githubUrl
                  ? <SocialIcon target='_blank' url={props.githubUrl}></SocialIcon>
                  : "" 
              }

          </div>
          <p>Skills</p>
          <div className='skills-container'>
              {
                  props.skillsUsed
                  ? props.skillsUsed.map((item,index) => {
                      return <SkillsTag key={index} tag={item}></SkillsTag>
                  })
                  : ''
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

import React from 'react'
import './CertificationCard.scss'
import Tag from '../Tag/Tag'
import SkillsTag from '../SkillsTag/SkillsTag'

const CertificationCard = ({props}) => {
  
  return (
    <div className='certification-card scale-up'>
      <div className='certificate-image '>
        <a target='_blank' href={props.certificateUrl}><img src={props.certificateUrl} alt="Certificate" /></a>
      </div>
      <div className='card-body'>
        <div className="upper-body ">
          <div className='logo'>
            <img src={props.institutionLogo} alt="logo" />
          </div>
          <div className='certification-details flex1'>
            <p className='certificate-title'>{props.title}</p>
            <p className='institute-name'>{props.institution}</p>
            <p className='credID'>Credential: {props.credId}</p>
            <a target='_blank' className='remove-link-decor hoverable' href={props.credUrl}><p className='credURL'>Credential Link</p></a>
            <p className='duration'>{new Date(props.startDate).toDateString()} - {new Date(props.endDate).toDateString()}</p>
          </div>
        </div>
        <div className='lower-body'>
          <p className='description'>{props.description}</p>
          <p className='skills-head'>Skills</p>
          <div className='skills-container'>
            {
              props.skillsLearned
              ? props.skillsLearned.map((item,index) => {
                return <SkillsTag key={index} tag={item}></SkillsTag>
              })
              : <p>No skills gained...</p>
            }
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CertificationCard

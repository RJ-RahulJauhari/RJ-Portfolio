import React from 'react'
import './ExperienceCard.scss'
import SkillsTag from '../SkillsTag/SkillsTag'

const ExperienceCard = ({props}) => {

    const gotoCertificate = () => {
        
    }



  return (
    <div className='experience-card'>
        <div className='experience-left  flex4'>
            <div className='experience-top '>
                <div className='company-logo'>
                    <img src={props.companyLogo} alt="Company Logo" />
                </div>
                <div className='experience-details flex4'>
                    <p className='exp-title'>{props.title}</p>
                    <p className='comp-name'>{props.companyName}</p>
                    <p className='duration'>{new Date(props.startDate).toDateString()} - {new Date(props.endDate).toDateString()}</p>
                    <p className='location '>{props.location} | <span className='exp-type'>{props.experienceType}</span></p>
                </div>
            </div>
            <div className='experience-bottom'>
                <text className='description'>{props.description}</text>
                <p className='skills-used'>Skills Used</p>
                <div className='skills-container'>
                    {
                        props.skillsUsed
                        ? props.skillsUsed.map((item,index) => {
                            return <SkillsTag key={index} tag={item}></SkillsTag>
                        })
                        : <p>No Experience found</p>
                    }
                </div>
            </div>
        </div>
        <div className='experience-right flex1'>
            {
                props.certificateUrl
                ? <a href={props.certificateUrl} target='_blank'><img src={props.certificateUrl} alt="Certificate" /></a>
                : ''
            }
             {
                props.offerLetterUrl
                ? <a href={props.offerLetterUrl} target='_blank'><img src={props.offerLetterUrl} alt="OfferLetter" /></a>
                : ''
            }
        </div>
      
    </div>
  )
}

export default ExperienceCard

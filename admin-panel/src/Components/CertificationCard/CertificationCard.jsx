import React from 'react'
import './CertificationCard.scss'
import ExperienceSkillTag from "../ExperienceSkillTag/ExperienceSkillTag";

const CertificationCard = ({id,props, editFunc, deleteFunc}) => {
  return (
    <div className="certification-card">
      <div className="certification-left">
        <div className="certification-left-top">
          <div className="logo">
            <img src={props.institutionLogo} alt="Institution Logo" />
          </div>
          <div className="info flex1">
            <p className="title">{props.title}</p>
            <p className="institution-name">{props.institution}</p>
            <div className="sub-info">
                <div>
                    <h3>Credential</h3>
                    <p>Credential ID: {props.credId} </p>
                    <p>Credential Link: <a target="_blank" href={props.credUrl} className="cred-link"> Click Here </a></p>
                </div>
                <p className="duration"> {new Date(props.startDate).toLocaleDateString()} - {new Date(props.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="certification-left-bottom flex1">
          <p className="skills-heading">Skills Learned</p>
          <div className="skills-container">
            {
                (props.skillsLearned).map((item,index) => {
                    return <ExperienceSkillTag color='red' key={index} tag={item}></ExperienceSkillTag>
                })
            }
          </div>
        </div>
      </div>
      <div className="certification-right">
        <h2>Description</h2>
        <div className="description flex3">
            <p>{props.description}</p>
        </div>
        <div className="certification-buttons flex1">
          <button onClick={() => {editFunc(id)}} className="flex1">Edit</button>
          <button onClick={() => {deleteFunc(id)}} className="flex1">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default CertificationCard

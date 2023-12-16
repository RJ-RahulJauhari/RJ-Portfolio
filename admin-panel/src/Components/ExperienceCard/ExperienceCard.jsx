import React from "react";
import "./ExperienceCard.scss";
import ExperienceSkillTag from "../ExperienceSkillTag/ExperienceSkillTag";

const ExperienceCard = ({id,props, editFunc, deleteFunc}) => {
  return (
    <div className="experience-card">
      <div className="experience-left">
        <div className="experience-left-top">
          <div className="logo">
            <img src={props.companyLogo} alt="Company Logo" />
          </div>
          <div className="info flex1">
            <p className="title">{props.title}</p>
            <p className="company-name">{props.companyName}</p>
            <div className="sub-info">
                <span className="experience-type">{props.experienceType}</span>
                <p className="duration"> {new Date(props.startDate).toLocaleDateString()} - {new Date(props.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="experience-left-bottom flex1">
          <p className="skills-heading">Skills Used</p>
          <div className="skills-container">
            {
                (props.skillsUsed).map((item,index) => {
                    return <ExperienceSkillTag key={index} color='#1640D6' tag={item}></ExperienceSkillTag>
                })
            }
          </div>
        </div>
      </div>
      <div className="experience-right">
        <h2>Description</h2>
        <div className="description flex3">
            <p>{props.description}</p>
        </div>
        <div className="experience-buttons flex1">
          <button onClick={() => {editFunc(id)}} className="flex1">Edit</button>
          <button onClick={() => {deleteFunc(id)}} className="flex1">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

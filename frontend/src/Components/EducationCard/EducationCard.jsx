import React from 'react'
import './EducationCard.scss'
import Tag from '../Tag/Tag'

const EducationCard = ({props}) => {

  return (
    <div className={`education-card card-border elevated-card`}>
      <p className='institute-name'>{props.name}</p>
      <div className='institute-tag'>
        <Tag tag={props.institutionType}></Tag>
      </div>
      <p><span className='class'>{props.class} |</span> <span className='board'>{props.board}</span></p>
      <p className='duration'><span>{new Date(props.startYear).getFullYear()}</span> - <span>{new Date(props.endYear).getFullYear()}</span></p>
      <p className='score-info'>Score: <span className='score'>{props.score}</span> <span>{props.scoreUnit}</span></p>
      <p className='description expandable'>{props.description}</p>
    </div>
  )
}

export default EducationCard

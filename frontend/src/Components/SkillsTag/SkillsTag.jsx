import React from 'react'
import './SkillsTag.scss'

const SkillsTag = ({tag,onClick}) => {
  return (
    <div onClick={() => {onClick()}} className='skills-tag'>
      <p className=''>{tag}</p>
    </div>
  )
}

export default SkillsTag

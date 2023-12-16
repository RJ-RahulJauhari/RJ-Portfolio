import React from 'react'
import './ProjectImage.scss'

const ProjectImage = ({index,imageUrl,func}) => {
  return (
    <div className='project-image section-border'>
      <img src={imageUrl} alt="image" />
      <button onClick={() => {func(index)}} className='cust'>Delete</button>
    </div>
  )
}

export default ProjectImage

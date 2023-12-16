import React from 'react'
import './BlogCard.scss'
import ExperienceSkillTag from '../ExperienceSkillTag/ExperienceSkillTag';

const BlogCard = ({id,props,func,approve,decline}) => {
  return (
  <div onClick={() => {func(id)}} className= 'blog-card scale-up'>
  <img className='logo' src={props.imageUrl} alt="Logo" />
  <div className={`card-body flex1`}>
      <div className='heading'>
          <h2>{props.title}</h2>
      </div>
      <div className={`blog-info`}>
          <p className='author'>{props.author}</p>
          <div className='space-out-h'>
              <p className='category'>{props.blogType}</p>
              <p className='date'>{new Date(props.publishedDate).toLocaleDateString()}</p>
          </div>
          <p className='description'>{props.shortDescription}</p>
      </div>
      <div className='blog-categories'>
          <h3>Tags</h3>
          <div className='categories-container'>
              {
                  (props.categories).map((item,index) => {
                      return <ExperienceSkillTag key={index} tag={item}></ExperienceSkillTag>
                  })
              }
          </div>
      </div>
      <div className='blog-card-buttons'>
        <button onClick={() => {approve(id)}}>Approve</button>
        <button onClick={() => {decline(id)}}>Decline</button>
        <button>Remove</button>
      </div>
  </div>

</div>
  )
};


export default BlogCard

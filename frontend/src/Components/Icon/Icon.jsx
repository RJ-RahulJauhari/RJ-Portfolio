import React from 'react'
import './Icon.scss'

const Icon = ({iconUrl,url}) => {
  return (
    <a target='_blank' href={url}>
        <div className='icon'>
            <img src={iconUrl} alt="" />
        </div>
    </a>
  )
}

export default Icon

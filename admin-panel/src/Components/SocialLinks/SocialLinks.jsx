import React from 'react'
import { SocialIcon } from 'react-social-icons'
import "./SocialLinks.scss"
import { MdDelete } from "react-icons/md";

const SocialLinks = ({url,delfunc,size,customKey}) => {

  return (
    <div className='social-card hoverable'>
      <SocialIcon className='icon flex1' url={url}></SocialIcon>
      <p className='link flex4 '><b>Link: </b>{url}</p>
      <MdDelete size={size} onClick={() => {delfunc(customKey)}} className='flex1' />
    </div>
  )
}

export default SocialLinks

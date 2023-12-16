import React from 'react'
import './ContactCard.scss'

const ContactCard = ({props, onClick}) => {
  return (
    <div className='contact-card hoverable'>
      <div className='cust-details'>
        <p className='name'>{props.name}</p>
        <p className='email'>{props.email}</p>
        <p className='phone'>{props.phone}</p>
      </div>
      <div className='description'>
        <p>Description:</p>
        <p className='reason'>{props.contactPurpose}</p>
      </div>
    </div>
  )
}

export default ContactCard

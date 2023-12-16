import React, { useContext, useState } from 'react'
import './ContactPage.scss'
import { HeroContext } from '../../Context/HeroContext'
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../../url';

const ContactPage = () => {
  const {hero} = useContext(HeroContext);
  const page = useLocation().pathname.substring(1);
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [description,setDescription] = useState();
  const [phone,setPhone] = useState();
  const [message,setMessage] = useState('');

  const sendContactRequest = async () => {
    const contactData = {
      name,
      email,
      phone,
      contactPurpose: description
    }

    try {
      await axios.post(`${BASE_URL}/contacts/`,contactData,{withCredentials:true})
      .then((res) => {
        const data = res.data;
        if(data){
          setMessage(`${data.name} your contact request has been sent...`)
        }
      })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className='contact-page full-width'>
      {
        page === 'contact'
        ?<div className='spacer'></div>
        : <p className='title scale-up'>Contact Me<br /> <span className='caption'>Get in touch...</span></p>
      }
      <div className='main-container'>
        <div className='left-container flex1'>
           <p className='directions'>Fill the form below to contact me...</p>
          <div className='fields'>
            <input onChange={(e) => {setName(e.target.value); setMessage('')}} className='field' type='text' placeholder='Name'/>
            <input onChange={(e) => {setEmail(e.target.value); setMessage('')}} className='field' type="text" placeholder='Email' />
            <input onChange={(e) => {setPhone(e.target.value); setMessage('')}} className='field' type="text" placeholder='Phone Number' />
            <textarea onChange={(e) => {setDescription(e.target.value); setMessage('')}} className='text-field' name="" id="" cols="30" rows="10" placeholder='Briefly describe the reason for contact...'></textarea>
            <button className='primary-button' onClick={() =>{sendContactRequest()}}>Submit</button>
            <p>{message}</p>
          </div>
        </div>
        <div className='right-container flex1'>
          <p className='heading'>Or contact me here...</p>
          <div className='contact-container'>
            <div className='contact'>
              <IoMdMail size={45} />
              <p>{hero? hero.email : ''}</p>
            </div>
            <div className='contact'>
              <FaPhone size={45} />
              <p>+91 {hero? hero.phone:''}</p>
            </div>
            <p className='other-plat-text'>Other Platforms</p>
            <div className='contact-icons'>
              <a target='_blank' className='remove-link-decor' href='https://www.linkedin.com/in/rahul-jauhari-596520214/'><FaLinkedin size={45} /></a>
              <a target='_blank' className='remove-link-decor' href='https://github.com/RJ-RahulJauhari'><FaGithub size={45}/></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactPage

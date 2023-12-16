import React, { useEffect, useState } from 'react'
import './EditContactPage.scss'
import ContactCard from '../../Components/ContactCard/ContactCard'
import axios from 'axios';
import { BASE_URL } from '../../url';

const EditContactPage = () => {
    const [contacts,setContacts] = useState();

    useEffect(() => {
        getContacts();
    },[])

    const getContacts = async () => {
        try {
            await axios.get(`${BASE_URL}/contacts/`,{withCredentials:true})
                .then((res) => {
                    const data = res.data;
                    if(data){
                        setContacts(data)
                        console.log(data)
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='edit-contact-page'>
      <div className='header'>
        <h1 className='title'>Manage Contacts</h1>
        <input placeholder='Search' className='field-transparent search' type="text" />
      </div>
      <div className='contact-container'>
        {
            contacts
            ?contacts.map((item,index) => {
                return <ContactCard key={index} id={item._id} props={item}></ContactCard>
            })
            : <p>No contacts yet....</p>
        }
      </div>
    </div>
  )
}

export default EditContactPage

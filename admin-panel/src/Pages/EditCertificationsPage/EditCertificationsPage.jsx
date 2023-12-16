import React,{useEffect,useState} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './EditCertificationsPage.scss'
import {useNavigate} from 'react-router-dom'
import CertificationCard from '../../Components/CertificationCard/CertificationCard'
import axios from 'axios'
import { BASE_URL } from '../../url'

const EditCertificationsPage = () => {
  const navigate = useNavigate();

  const [certifications,setCertifications] = useState([]);
  const [message,setMessage] = useState('');

  const getCertifications = async () =>{
    try {
      await axios.get(`${BASE_URL}/certifications/getAllSorted`)
      .then((res) => {
        const data = res.data;
        if(data){
          setCertifications(data)
        }
      })
    } catch (error) {
      console.log(error)
      setMessage(error.response.data);
    }
  }

  useEffect(() => {
    getCertifications()
  },[])


  const handleEdit = (id) => {
    console.log("Edit button clicked");
    navigate(`/certifications/edit?id=${id}`)
  };

  const handleDelete = async (id) => {
    try {
      console.log("Delete button clicked");
      await axios.delete(`${BASE_URL}/certifications/${id}`, {withCredentials:true})
        .then((res) => {
          const data = res.data;
          if(data){
            console.log(data)
            getCertifications();
          }
        })
    } catch (error) {
      console.log(error);
      setMessage(error.response.data);
    }
  };


  return (
    <div className='certification-page'>
      <div className='certification-header'>
        <h1 className='title'>Certifications</h1>
        <button onClick={() => {navigate('/certifications/add')}}>Add Certification</button>
      </div>
      <div className='certification-body'>
        {
          certifications.length === 0
          ? <p>{message}</p>
          : certifications.map((item,index) => {
            return <CertificationCard color='red' key={index} id={item._id} props={item} editFunc={handleEdit} deleteFunc={handleDelete}/>
          })
        }
         
      </div>
    </div>
  )
}

export default EditCertificationsPage

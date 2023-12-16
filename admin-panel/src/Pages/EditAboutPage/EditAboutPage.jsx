import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './EditAboutPage.scss'
import EducationCard from '../../Components/EducationCard/EducationCard'
import axios from 'axios';
import { BASE_URL } from '../../url';
import { RenderContext } from '../../Context/RenderContext';
import {useNavigate} from 'react-router-dom';

const EditAboutPage = () => {

  const [education,setEducation] = useState([]);
  const [render,toggleRender] = useState(false);
  const navigate = useNavigate();

  const getEducation = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/education/getAll`)
      if(res.data){
        setEducation(res.data || []);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEducation = async (key,index) => {
    const id = key;
    try {
        await axios.delete(`${BASE_URL}/education/delete?id=${id}`,{withCredentials:true})
        .then((res) => {
            const temp = [...education]
            temp.splice(index,1)
            setEducation(temp);
            console.log(res.data);
            // rerender();
    })
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getEducation();
  },[])

  return (
    <div className='edit-about-page'>
      <div className="header">
        <h1>About Me</h1>
        <button onClick={() => {navigate('/about/add')}} className='add-edu-button'>Add Education</button>
      </div>
      <div className='education-container '>
        {
          education.length === 0? <h3>No education found...</h3>:
          education.map((item,index) => {
            console.log(item._id);
            return <EducationCard onEdit={() => {navigate(`/about/edit?id=${item._id}`)}} onDelete={() => deleteEducation(item._id,index)} key={item._id} props={item}></EducationCard>
          })
        }
      </div>
    </div>
  )
}

export default EditAboutPage

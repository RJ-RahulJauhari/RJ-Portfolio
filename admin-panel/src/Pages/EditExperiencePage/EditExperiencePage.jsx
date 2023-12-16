import React, { useContext, useEffect,useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ExperienceCard from '../../Components/ExperienceCard/ExperienceCard'
import './EditExperiencePage.scss'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { BASE_URL } from '../../url';


const EditExperiencePage = () => {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [experiences,setExperiences] = useState([]);
  const [render,setRender] = useState(false);
  const rerender = () => setRender(!render);

  const getExperiences = async () => {
    try {
      await axios.get(`${BASE_URL}/experience/getAllSorted`)
      .then(async (res) =>{
        const data = res.data;
        if(data){
          setExperiences([...data])
          console.log(data)
          console.log(experiences)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteExperience = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/experience/delete/${id}`,{withCredentials:true})
        .then((res) => {
          const data = res.data;
          if(data){
            console.log(data);
            getExperiences();
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    getExperiences();
  },[])


  // const experienceData = {
  //   _id: "erfhjerhfnernfjef",
  //   logo: "https://blog.hubspot.com/hubfs/image8-2.jpg",
  //   title: "Software Developer",
  //   companyname: "Tech Co.",
  //   experienceType: "Full-time",
  //   startDate: "Jan 2020",
  //   endDate: "Present",
  //   skills: ["JavaScript", "React", "Node.js","HTML","SCSS","Express JS"],
  //   description: "This function, getRandomColor, now takes an optional factor parameter (defaulting to 0.3) to control the darkness of the generated color. The getRandomComponent function is used to generate a random value for each RGB component. The darkenColor function is responsible for darkening the original color based on the specified factor. Remember to replace yourComponentId with the actual ID of your HTML component. If you're working with a different framework, adjust the code accordingly. This function, getRandomColor, now takes an optional factor parameter (defaulting to 0.3) to control the darkness of the generated color. The getRandomComponent function is used to generate a random value for each RGB component. The darkenColor function is responsible for darkening the original color based on the specified factor. Remember to replace yourComponentId with the actual ID of your HTML component. If you're working with a different framework, adjust the code accordingly.This function, getRandomColor, now takes an optional factor parameter (defaulting to 0.3) to control the darkness of the generated color. The getRandomComponent function is used to generate a random value for each RGB component. The darkenColor function is responsible for darkening the original color based on the specified factor. Remember to replace yourComponentId with the actual ID of your HTML component. If you're working with a different framework, adjust the code accordingly.",
  // };


  const handleEdit = (id) => {
    console.log("Edit button clicked");
    navigate(`/experience/edit?id=${id}`)
  };


  return (
    <div className='experience-page'>
      <div className='experience-header'>
        <h1 className='title'>Experience</h1>
        <button onClick={() => {navigate('/experience/add')}}>Add Experience</button>
      </div>
      <div className='experience-body'>
        {
          experiences.map((item,index) => {
            return <ExperienceCard key={index} id={item._id} props={item} skills={item.skillsUsed} editFunc={handleEdit} deleteFunc={(id) => {deleteExperience(id)}} />
          })
        }
      </div>
    </div>
  )
}

export default EditExperiencePage

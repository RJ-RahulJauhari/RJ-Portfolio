import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import './EditProjectsPage.scss'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../url';

const EditProjectsPage = () => {

  const navigate = useNavigate();

  const [projects,setProjects] = useState([]);

  const getProjects = async () => {
    try {
      await axios.get(`${BASE_URL}/projects/getAllSorted`)
        .then((res) => {
          const data = res.data;
          if(data){
            console.log(data)
            setProjects([...data]);
          }
        })
    } catch (error) {
      console.log(error)
      if(error.response.status === 404){
        setProjects([]);
      }
    }
  }

  useEffect(() => {
    getProjects()
  },[])


  // const sampleProjectData = {
  //   id: 1,
  //   props: {
  //     logo: 'https://blog.hubspot.com/hubfs/image8-2.jpg',
  //     title: 'TechHub Website Redesign',
  //     category: 'Web Development',
  //     startDate: '2022-05-15',
  //     endDate: '2022-08-20',
  //     shortDescription: 'Revamped the TechHub website to enhance user experience and modernize the design.',
  //     skillsUsed: ['React', 'JavaScript', 'CSS', 'UI/UX Design']
  //   },
  //   func: (projectId) => {
  //     console.log(`Clicked on project with ID: ${projectId}`);
  //     navigate(`/projects/edit?id=${sampleProjectData.id}`)
  //     // Add your custom functionality here
  //   }
  // };

  const navigateToProjectEdit = (id) => {
    console.log(`Clicked on project with ID: ${id}`);
      navigate(`/projects/edit?id=${id}`)
      // Add your custom functionality here
  }




  return (
    <div className='edit-project-page'>
      <div className='header'>
        <h1 className='title'>Projects</h1>
        <button onClick={() => {navigate('/projects/add')}}>Add Project</button>
      </div>
      <div className='projects'>
        {
          projects.length === 0?
             <p>No projects yet</p>
          :projects.map((item,index) => {
            return <ProjectCard key={index} id={item._id} props={item} func={navigateToProjectEdit}></ProjectCard>
          })
        }
      </div>
    </div>
  )
}

export default EditProjectsPage

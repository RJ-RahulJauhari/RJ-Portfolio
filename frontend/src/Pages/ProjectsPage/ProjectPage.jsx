import React, { useContext, useEffect, useState } from 'react'
import './ProjectPage.scss'
import SkillsTag from '../../Components/SkillsTag/SkillsTag'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { HeroContext } from '../../Context/HeroContext'
import axios from 'axios';
import { BASE_URL } from '../../url'
import {useLocation,useNavigate} from 'react-router-dom'

const ProjectPage = () => {

  const {projects,projectList,setProjectList} = useContext(HeroContext)
  const [searchString,setSearchString] = useState(null);
  const [message,setMessage] = useState('');

  const page = useLocation().pathname.substring(1);

  const getByName = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/projects/getByTitle?title=${searchString}`);
      const data = res.data;
  
      if (data) {
        setProjectList(data);
      }else{
        setProjectList([]);
      }
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data);
    }
  };


  const getCategory = async (categoryFilter) => {
    try {
      await axios.get(`${BASE_URL}/projects/getByCategory?category=${categoryFilter}`)
      .then((res) => {
        const data = res.data;
        if(data){
          setProjectList(data);
        }else{
          setProjectList([]);
        }
      })
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data);
    }
  }
  

  useEffect(() => {
    console.log(searchString)
    if(searchString === ''){
      setProjectList(projects);
    }else{
      getByName()
    }
  },[searchString])



  return (
    <div className='project-page'>
      
      {
        page === 'projects'
        ?<div className='spacer'></div>
        : <p className='title scale-up'>Projects <br /> <span className='caption'>Have a look at my projects</span></p>
      }
      <div className='search-section'>
        <input value={searchString} onChange={(e) => {setSearchString(e.target.value)}} className='search-bar' type="text" placeholder='Search' />
        <div className='filter-bar'>
          <SkillsTag onClick={() => {getCategory('App Development')}} tag='App Development'></SkillsTag>
          <SkillsTag onClick={() => {getCategory('Web Development')}} tag='Web Development'></SkillsTag>
          <SkillsTag onClick={() => {getCategory('Machine Learning')}} tag='Machine Learning'></SkillsTag>
        </div>
      </div>
      <div className='project-container'>
      {projectList ? (
          projectList.map((item, index) => {
            return <ProjectCard key={index} props={item}></ProjectCard>;
          })
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  )
}

export default ProjectPage

import React, { useContext, useEffect, useState } from 'react'
import './AboutPage.scss'
import { HeroContext } from '../../Context/HeroContext'
import EducationCard from '../../Components/EducationCard/EducationCard';
import {useLocation} from 'react-router-dom'
import axios from "axios";
import { BASE_URL } from "../../url";

const AboutPage = () => {
  //const {hero,education} = useContext(HeroContext);
  const [hero,setHero] = useState(null);
  const [education,setEducation] = useState(null); 
  const page = useLocation().pathname.substring(1);

  useEffect(() => {
    getHero();
    getEducation();
  },[])

  const getHero = async () =>{
    try {
        await axios.get(`${BASE_URL}/users/hero`)
        .then((res) =>{
            setHero(res.data);
        })
    } catch (error) {
        setHero(null);
        console.log(error.response.data);
    }
  }

  const getEducation = async () => {
    try {
        await axios.get(`${BASE_URL}/education/getAll`)
        .then((res) => {
            const data = res.data;
            if(data){
                setEducation(data)
            }
        })
    } catch (error) {
        console.log(error.response.data)
    }
}

  if(hero && education){
    return (
      <div className='about-page full-width'>
        
        {
        page === 'about'
        ?<div className='spacer'></div>
        :  <p className='title scale-up'>My Journey <br /><span className='caption'>Get to know where it all started</span></p>
        }
        <div className='about-container gap3'>
          <div className='about-left flex1'>
            <h1 className='heading'>About Me</h1>
            <p className='description wrapable-text'>{hero.description}</p>
          </div>
          <div className='about-right flex1 gap3'>
            <h1 className='heading'>Education</h1>
            {
              education
              ? education.map((item,index) => {
                return <EducationCard key={item._id} props={item}></EducationCard>
              })
              : <p>Education not found</p>
            }
          </div>
        </div>
      </div>
    )
  }else{
    return (
      <div>
        Something went Wrong
      </div>
    )
  }
}

export default AboutPage

import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Select from 'react-select'
import SkillsTag from '../../Components/SkillsTag/SkillsTag';
import './EditSkillsPage.scss'
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { BASE_URL } from '../../url';


const EditSkillsPage = () => {

  // const [programminglanguage,setProgramingLanguages] = useState([]);
  // const [frontend,setFrontend] = useState([]);
  // const [backend,setBackend] = useState([]);
  // const [framework,setFramework] = useState([]);
  // const [others,setOthers] = useState([]);

  const [skills,setSkills] = useState([]);
  const [skill,setSkill] = useState();
  const [category,setCategory] = useState();

  const {user,setUser} = useContext(UserContext);
  const [render,triggerRender] = useState(false);

  useEffect(() => {
    getSkills();
  },[user,render])

  const getSkills = async () => {
    try {
      await axios.get(`${BASE_URL}/skills/getUserSkills?id=${user._id}`)
        .then(async (res) => {
          const data = res.data;
          console.log(data)
          if(data){
            await setSkills([...data])
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const addSkill = async () => {
    const obj = {
      skill,
      category,
      userID:user._id
    }

    try {
      await axios.post(`${BASE_URL}/skills/add`,obj,{withCredentials:true})
        .then((res) => {
          console.log(res.data);
          setSkill('');
          triggerRender(!render);
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleEnter = (event) => {
    if(event.key === "Enter"){
      addSkill();
    }
  }

  const deleteSkill = async (skillId) => {
    try {
      await axios.delete(`${BASE_URL}/skills/delete?id=${skillId}`,{withCredentials:true})
        .then((res) => {
          console.log(res.data);
          getSkills();
        })
    } catch (error) {
      console.log(error)
    }
  }

  const updateSkill = async (skillId,updatedSkill) => {
    const tag = {skill:updatedSkill};
    try {
      await axios.patch(`${BASE_URL}/skills/update?id=${skillId}`,tag,{withCredentials:true})
        .then((res) => {
          console.log(res);
        })


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='skills-page'>
      <h1 className='title'>Skills</h1>
      <div className='add-skills-bar'>
        <input value={skill} onKeyUp={(e) => handleEnter(e)} onChange={(e) => setSkill(e.target.value)} type="text" className='field-transparent flex2' placeholder='Add a Skill' />
        <Select 
          placeholder='Category'
          className='dropdown flex1'
          defaultValue={{ value: 'others', label: 'Others' }}
          onChange={(e) => setCategory(e.value)}
          options={[
            { value: 'programminglanguage', label: 'Programming Language' },
            { value: 'frontend', label: 'Frontend' },
            { value: 'backend', label: 'Backend' },
            { value: 'framework', label: 'Framework' },
            { value: 'others', label: 'Others' },
          ]}>
        </Select>
        <button onClick={() => addSkill()} className='flex1'>Add</button>
      </div>
      <div className='main-categories'>
        <div className='skills'>
          <h1>Programing Languages</h1>
          <div className='skills-container'>
            {
              skills.map((item,index) => {
                if(item.category === 'programminglanguage') {return <SkillsTag key={index} id={item._id} name={item.skill} category={item.category} deleteFunc={deleteSkill} updateFunc={updateSkill}></SkillsTag>}
              })
            }
          </div>
        </div>
        <div className='skills'>
          <h1>Frontend</h1>
          <div className='skills-container'>
          {
              skills.map((item,index) => {
                if(item.category === 'frontend') {return <SkillsTag key={index} id={item._id} name={item.skill} category={item.category} deleteFunc={deleteSkill} updateFunc={updateSkill}></SkillsTag>}
              })
            }
          </div>
        </div>
        <div className='skills'>
          <h1>Backend</h1>
          <div className='skills-container'>
          {
              skills.map((item,index) => {
                if(item.category === 'backend') {return <SkillsTag key={index} id={item._id} name={item.skill} category={item.category} deleteFunc={deleteSkill} updateFunc={updateSkill}></SkillsTag>}
              })
            }
          </div>
        </div>
        <div className='skills'>
          <h1>FrameWorks</h1>
          <div className='skills-container'>
          {
              skills.map((item,index) => {
                if(item.category === 'framework') {return <SkillsTag key={index} id={item._id} name={item.skill} category={item.category} deleteFunc={deleteSkill} updateFunc={updateSkill}></SkillsTag>}
              })
            }
          </div>
        </div>
        <div className='skills'>
        <h1>Other Skills</h1>
        <div className='skills-container'>
        {
              skills.map((item,index) => {
                if(item.category === 'others') {return <SkillsTag key={index} id={item._id} name={item.skill} category={item.category} deleteFunc={deleteSkill} updateFunc={updateSkill}></SkillsTag>}
              })
            }
        </div>
      </div>
      </div>
    </div>
  )
}

export default EditSkillsPage

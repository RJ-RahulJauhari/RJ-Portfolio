import React from 'react'
import './EditEducation.scss';
import { useEffect, useState } from 'react'
import { FaDeleteLeft } from "react-icons/fa6";
import axios from 'axios';
import { BASE_URL } from '../../url';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';

const EditEducation = () => {
  const [name,setName] = useState();
  const [institutionType,setInstitutionType] = useState();
  const [classType,setClassType] = useState();
  const [board,setBoard] = useState();
  const [startYear,setStartYear] = useState();
  const [endYear,setEndYear] = useState();
  const [score,setScore] = useState();
  const [scoreUnit,setScoreUnit] = useState();

  const [society,setSociety] = useState();
  const [societiesList,setSocietiesList] = useState([]);

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const ID = queryParameters.get('id');
  const [fetchedData,setFetchedData] =  useState({});

  const handleSociety = (event) => {
      const data = event.target.value;
      if(event.key === 'Enter'){
          event.preventDefault();
          setSocietiesList([...societiesList,data])
      }
      console.log(societiesList)
  }

  const deleteSociety = (index) => {
      const temp = [...societiesList];
      temp.splice(index,1);
      setSocietiesList(temp);
  }

  const [achievement,setAchievement] = useState([]);
  const [achievementsList,setAchievementsList] = useState([]);
  const handleAchievement = (event) => {
      const data = event.target.value;
      if(event.key === 'Enter'){
          event.preventDefault();
          setAchievementsList([...achievementsList,data])
      }
      console.log(achievementsList)
  }

  const deleteAcheivement = (index) => {
      const temp = [...achievementsList];
      temp.splice(index,1);
      setAchievementsList(temp);
  }

  const [description,setDescription] = useState('');
  const [message,setMessage] = useState('');


  // const fetchFields = async () => {
  //   try {
  //     await axios.get(`${BASE_URL}/education/get?id=${ID}`,{withCredentials:true})
  //     .then(async (res) => {
  //       const data = res.data;
  //       console.log(data)
  //       if(data){
  //         await setFetchedData(data)
  //       }
  //     }).then(() => {
  //       setName(fetchedData.name);
  //       setInstitutionType(fetchedData.institutionType);
  //       setClassType(fetchedData.class);
  //       setBoard(fetchedData.board);
  //       setScore(fetchedData.score);
  //       setScoreUnit(fetchedData.scoreUnit);
  //       setStartYear(fetchedData.startYear);
  //       setEndYear(fetchedData.endYear);
  //       setAchievementsList(fetchedData.achievements || []);
  //       setSocietiesList(fetchedData.society || []);
  //       setDescription(fetchedData.description);
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     setMessage(error.response.data.message)
  //   }
  // }

  // const setFields = () => {
  // }

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/education/get?id=${ID}`);
        const data = response.data[0];
        console.log(data);

        if (data) {
          setFetchedData(data);
          setName(data.name);
          setInstitutionType(data.institutionType);
          setClassType(data.class);
          setBoard(data.board);
          setScore(data.score);
          setScoreUnit(data.scoreUnit);
          setStartYear(data.startYear);
          setEndYear(data.endYear);
          setAchievementsList(data.achievements || []);
          setSocietiesList(data.societies || []);
          setDescription(data.description);
        }
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.message);
      }
    };

    fetchFields();
  }, []);

  


  const updateInstitutionInDB = async () => {

      // Institutution Object Creation 
      const obj = {
          name:name,
          institutionType:institutionType,
          class:classType,
          board:board,
          startYear:startYear,
          endYear:endYear,
          score:score,
          scoreUnit:scoreUnit,
          societies:[...societiesList],
          achievements:[...achievementsList],
          description:description
      }
      console.log(obj)

      try {
          const data = await axios.patch(`${BASE_URL}/education/update?id=${ID}`,obj,{withCredentials:true})
          console.log(data);
          if(data){
              setMessage(data.data);
          }
      } catch (error) {
          console.log(error)
          setMessage(error.response.data.message)
      }
  }

  return (
    <div className='add-education-page'>
        <h1>Edit Education</h1>
        <div className='add-edu-section'>
            <div className='normal-fields flex1'>
                <h2>Institution Information</h2>
                <input value={name} onChange={(e) => {setName(e.target.value)}} className='field-transparent' type="text" placeholder='Name' />
                {/* <input onChange={(e) => {setInstitutionType(e.target.value)}} className='field-transparent' type="text" placeholder='Type' /> */}
                <Select
                    placeholder='Institution Type'
                    className='field-transparent'
                    defaultValue={{ value: {institutionType}, label: 'Others' }}
                    onChange={(selectedOption) => setInstitutionType(selectedOption.value)}
                    options={[
                        { value: 'primary', label: 'Primary' },
                        { value: 'secondary', label: 'Secondary' },
                        { value: 'others', label: 'Others' },
                    ]}
                />
                <input value={classType} onChange={(e) => {setClassType(e.target.value)}} className='field-transparent' type="text" placeholder='Class' />
                <input value={board} onChange={(e) => {setBoard(e.target.value)}} className='field-transparent' type="text" placeholder='Board' />
                <input value={score} onChange={(e) => {setScore(e.target.value)}} className='field-transparent' type="text" placeholder='Score' />
                <input value={scoreUnit} onChange={(e) => {setScoreUnit(e.target.value)}} className='field-transparent' type="text" placeholder='Score Gauge' />
            </div>
            <div className='date-fields flex1'>
                <h2>Duration</h2>
                <label htmlFor="startD">Start Date: {new Date(startYear).toLocaleDateString()}</label>
                <input onChange={(e) => {setStartYear(e.target.value)}} name='startD' className='field' type="date" placeholder='Start Year' />
                <label htmlFor="endD">End Date: {new Date(endYear).toLocaleDateString()}</label>
                <input onChange={(e) => {setEndYear(e.target.value)}} name='endD' className='field' type="date" placeholder='End Year' />
            </div>
        </div>
        <div className='multi-line-fields'>
            <div className='society flex1'>
                <h2>Societies</h2>
                <input onKeyDown={(e) => {handleSociety(e)}} onChange={(e) => {setSociety(e.target.value)}} className='field-transparent' type="text" placeholder='Society' />
                {
                    societiesList.map((item,index) => {
                        return (
                            <div key={index} className='card hoverable'>
                                <p className='info flex1'>{item}</p>
                                <FaDeleteLeft onClick={() => {deleteSociety(index)}} size={25} className='delete-button ' />
                            </div>
                        )
                    })
                }
            </div>
            <div className='achievment flex1'>
                <h2>Achievments</h2>
                <input onKeyDown={(e) => {handleAchievement(e)}} onChange={(e) => {setAchievement(e.target.value)}} className='field-transparent' type="text" placeholder='Achievements' />
                {
                    achievementsList.map((item,index) => {
                        return (
                            <div key={index} className='card hoverable'>
                                <p className='info  flex1'>{item}</p>
                                <FaDeleteLeft onClick={() => {deleteAcheivement(index)}} size={25} className='delete-button ' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className='description'>
            <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} className='field-transparent' placeholder='Description' cols="30" rows="10"></textarea>
            <button onClick={() => {updateInstitutionInDB()}}>Update</button>
            <p className='message'>{message}</p>
        </div>
      
    </div>
  )
}

export default EditEducation

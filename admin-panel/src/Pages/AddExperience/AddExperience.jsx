import React, { useContext, useEffect, useState } from 'react'
import './AddExperience.scss'
import ExperienceSkillTag from '../../Components/ExperienceSkillTag/ExperienceSkillTag'
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../url';
import { UploadFile } from '../../Firebase/FirebaseController';
import { UserContext } from '../../Context/UserContext';

const AddExperience = () => {

  const url = useLocation();
  const queryParams = new URLSearchParams(url.search);

  // Access individual query parameters
  const id = queryParams.get('id');
  const {user} = useContext(UserContext);

  const [title,setTitle] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [experienceType,setExperienceType] = useState('');
  const [location,setLocation] = useState('');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');

  const [companyLogo,setCompanyLogo] = useState('');
  const [newCompanyLogo,setNewCompanyLogo] = useState('');
  const [logoUploadPerc,setLogoUploadPerc] = useState(0);

  const [offerLetterUrl,setOfferLetterUrl] = useState('');
  const [newOfferLetter,setNewOfferLetter] = useState('');
  const [letterUploadPerc,setLetterUploadPerc] = useState(0);

  const [certificateUrl,setCertificateUrl] = useState('')
  const [newCertificate,setNewCertificate] = useState('');
  const [certificatePerc,setCertificateUploadPerc] = useState(0);

  const [skill,setSkill] = useState('');
  const [skills,setSkills] = useState([]);

  const [shortDescription,setShortDescription] = useState('');
  const [description,setDescription] = useState('')

  const [message,setMessage] = useState('');

  const [fetchedData,setFetchedData] = useState({});


  // Handling Skills add and delete operations
  const handleAddSkill = (key) => {
    if(key === 'Enter'){
      const temp = [...skills];
      temp.push(skill);
      setSkills(temp);
      setSkill('');
    }
    console.log(skills)
  }

  const handleDeleteSkill = (index) => {
    const temp = [...skills];
    temp.splice(index,1);
    setSkills(temp)
    console.log(skills);
  }

  // Firebase Media Upload
  const uploadCompanyLogo = () => {
    if(newCompanyLogo){
      const companyLogoDestination = `experience/${user._id}/${id}/companyLogo/${new Date().getTime().toString()+newCompanyLogo.name}`;
      UploadFile(newCompanyLogo,companyLogoDestination,setLogoUploadPerc,setCompanyLogo,setCompanyLogo);
    }
  }

  const uploadOfferLetter = () => {
    if(newOfferLetter){
      const offerLetterDestination = `experience/${user._id}/${id}/offerLetter/${new Date().getTime().toString()+newOfferLetter.name}`;
      UploadFile(newOfferLetter,offerLetterDestination,setLetterUploadPerc,setOfferLetterUrl,setNewOfferLetter);
    }
  }

  const uploadCertificate = () => {
    if(newCertificate){
      const certificateDestination = `experience/${user._id}/${id}/certificate/${new Date().getTime().toString()+newCertificate.name}`;
      UploadFile(newCertificate,certificateDestination,setCertificateUploadPerc,setCertificateUrl,setNewCertificate);
    }else{
      console.log("Nothing Selected")
    }
  }

  const addExperience = async () => {
    const obj = {
      title,
      companyName,
      experienceType,
      location,
      certificateUrl,
      offerLetterUrl,
      companyLogo,
      skillsUsed:skills,
      description,
      shortDescription,
      startDate,
      endDate
    }

    try {
      await axios.post(`${BASE_URL}/experience/add`,obj,{withCredentials:true})
        .then((res) => {
          const data = res.data;
          if(data){
            console.log(data)
          }
        })
    } catch (error) {
      console.log(error);
    }

  }



  return (
    <div className='add-experience-page'>
      <h1 className='title'>Edit Experience</h1>
      <div className='experience-info section-border'>
        <div className='experience-fields flex3'>
          <h1>Experience Details</h1>
          <input value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder='Title' className='field-transparent' type="text" />
          <input value={companyName} onChange={(e) => {setCompanyName(e.target.value)}} placeholder='Company Name' className='field-transparent' type="text" />
          <input value={experienceType} onChange={(e) => {setExperienceType(e.target.value)}} placeholder='Experience Type' className='field-transparent' type="text" />
          <textarea value={location} onChange={(e) => {setLocation(e.target.value)}} placeholder='Location' className='location-field field-transparent' cols="30" rows="10"></textarea>
        </div>
        <div className='duration flex2'>
          <h1>Duration</h1>

          <label htmlFor="startD">Start Date: {new Date(startDate).toLocaleDateString()} </label>
          <input value={startDate} onChange={(e) => {setStartDate(e.target.value)}}  name='startD' className='field-transparent' type="date" />

          <label htmlFor="endD">End Date: {new Date(endDate).toLocaleDateString()} </label>
          <input value={endDate} onChange={(e) => {setEndDate(e.target.value)}} name='endD' className='field-transparent' type="date" />
        </div>
      </div>
      <h1>Upload Documents</h1>
      <div className='experience-upload'>
        <div className='upload-container'>
          <h2>Company Logo</h2>
          <h3>Upload Progress: {logoUploadPerc}</h3>
          <img src={companyLogo} alt="Company Logo" />
          <input onChange={(e) => {setNewCompanyLogo(e.target.files[0])}} className='field' type="file" name="" id="" accept="image/*" />
          <button onClick={() => {uploadCompanyLogo()}}>Upload Company Logo</button>
        </div>
        <div className='upload-container'>
          <h2>Offer Letter</h2>
          <h3>Upload Progress: {letterUploadPerc}</h3>
          <img src={offerLetterUrl} alt="Offer Letter" />
          <input onChange={(e) => {setNewOfferLetter(e.target.files[0])}} className='field' type="file" name="" id="" accept="image/*" />
          <button onClick={() => {uploadOfferLetter()}}>Upload Offer Letter</button>
        </div>
        <div className='upload-container'>
          <h2>Certificate</h2>
          <h3>Upload Progress: {certificatePerc}</h3>
          <img src={certificateUrl} alt="Certificate" />
          <input onChange={(e) => {setNewCertificate(e.target.files[0])}} className='field' type="file" name="" id="" accept="image/*" />
          <button onClick={() => {uploadCertificate()}}>Upload Certificate</button>
        </div>
      </div>
      <div className='skills-description-section'>
        <div className='experience-skills section-border'>
          <h1>Skills Used</h1>
          <input value={skill} onChange={(e) => {setSkill(e.target.value)}} onKeyUp={(e) => {handleAddSkill(e.key)}} placeholder='Add Skills' className='field-transparent' type="text" />
          <div className='skills-container'>
            {
              skills.map((item,index) => {
                return <ExperienceSkillTag key={index} color="red" tag={item} onDelete={() =>{handleDeleteSkill(index)}}></ExperienceSkillTag>
              })
            }
          </div>
        </div>
        <div className='description flex1 section-border'>
          <h1>Description</h1>
          <input value={shortDescription} onChange={(e) => {setShortDescription(e.target.value)}}  placeholder='Short Description' className='field-transparent' type="text" />
          <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder='Long Description' className='field-transparent' cols="30" rows="10"></textarea>
        </div>
      </div>
      <div className='bottom-buttons'>
        <p className='message flex1 '>{message}</p>
        <button onClick={() => {addExperience()}} className='submit-btn'>Update Experience</button>
      </div>
    </div>
  )
}

export default AddExperience


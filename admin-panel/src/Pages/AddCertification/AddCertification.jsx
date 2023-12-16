import React, { useContext, useState } from 'react'
import './AddCertification.scss'
import { UploadFile } from '../../Firebase/FirebaseController'
import ExperienceSkillTag from '../../Components/ExperienceSkillTag/ExperienceSkillTag'
import axios from 'axios';
import { BASE_URL } from '../../url';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const AddCertification = () => {

  const navigate = useNavigate()
  const {user} = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [credId, setCredId] = useState('');
  const [credUrl, setCredUrl] = useState('');
  const [institutionLogo, setInstitutionLogo] = useState('');

  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [skill,setSkill] = useState('');
  const [skillsLearned, setSkillsLearned] = useState([]);

  const [certificate, setCertificate] = useState('');
  const [newCertificate, setNewCertificate] = useState('');
  const [certificatePerc, setCertificatePerc] = useState(0);
  const [certificateUrl, setCertificateUrl] = useState('');

  const [message,setMessage] = useState('');

  // Handling Skills add and delete operations
  const handleAddSkill = (key) => {
    if(key === 'Enter'){
      const temp = [...skillsLearned];
      temp.push(skill);
      setSkillsLearned(temp);
      setSkill('');
    }
    console.log(skillsLearned)
  }

  const handleDeleteSkill = (index) => {
    const temp = [...skillsLearned];
    temp.splice(index,1);
    setSkillsLearned(temp)
    console.log(skillsLearned);
  }

  // Firebase Upload
  const uploadCertificate = () => {
    if(newCertificate){
      const certificateDestination = `certification/${user._id}/certificates/${new Date().getTime().toString()+certificate.name}`;
      UploadFile(newCertificate,certificateDestination,setCertificatePerc,setCertificate,setCertificateUrl);
    }
  }

  // Add Certification Functionality
  const addCertification = async () => {
    const obj = {
      title,
      institution,
      institutionLogo,
      credId,
      credUrl,
      certificateUrl,
      institutionLogo,
      skillsLearned,
      description,
      shortDescription,
      startDate,
      endDate
    }

    try {
      await axios.post(`${BASE_URL}/certifications/add`,obj,{withCredentials:true})
        .then((res) =>{
          const data = res.data;
          if(data){
            console.log(data)
            setMessage('Certification Added')
          }
        })
        .then(() => {
          navigate('/certifications')
        })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='add-certification'>
        <h1 className='title'>Add Certification</h1>
      <div className='certification-details section-border'>
        <div className='certification-info flex3'>
            <h1>Certification Details</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='field-transparent' type="text" />
            <input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder='Institution' className='field-transparent' type="text" />
            <input value={institutionLogo} onChange={(e) => setInstitutionLogo(e.target.value)} placeholder='Institution Logo' className='field-transparent' type="text" />
            <input value={credId} onChange={(e) => setCredId(e.target.value)} placeholder='Credential ID' className='field-transparent' type="text" />
            <input value={credUrl} onChange={(e) => setCredUrl(e.target.value)} placeholder='Credential Link' className='field-transparent' type="text" />
        </div>
        <div className='duration flex2'>
          <h1>Duration</h1>

          <label htmlFor="startD">Start Date: {new Date(startDate).toLocaleDateString()}</label>
          <input onChange={(e) => {setStartDate(e.target.value)}} name='startD' className='field-transparent' type="date" />

          <label htmlFor="endD">End Date: {new Date(endDate).toLocaleDateString()}</label>
          <input onChange={(e) => {setEndDate(e.target.value)}} name='endD' className='field-transparent' type="date" />
        </div>
      </div>
        <div className='certificate-upload'>
            <div className='certification-skills section-border flex2'>
                <h1>Skills Used</h1>
                <input value={skill} onChange={(e) => {setSkill(e.target.value)}} onKeyUp={(e) => {handleAddSkill(e.key)}} placeholder='Add Skills' className='field-transparent' type="text" />
                <div className='skills-container'>
                  {
                    skillsLearned.map((item,index) => {
                      return <ExperienceSkillTag key={index} index={index} tag={item} onDelete={() => {handleDeleteSkill(index)}}></ExperienceSkillTag>
                    },[])
                  }
                </div>
            </div>
            <div className='upload-container flex1'>
                <h2>Certificate Upload</h2>
                <h3>Upload Progress: {certificatePerc}</h3>
                <img value={certificate} src={certificate} alt="certificate" />
                <input onChange={(e) => setNewCertificate(e.target.files[0])} type="file" accept='images/*' />
                <button onClick={() =>{uploadCertificate()}}>Upload</button>
            </div>
        </div>

      <div className='certification-bottom'>
        <div className='description section-border flex1'>
            <h1>Description</h1>
            <input value={shortDescription} onChange={(e) => {setShortDescription(e.target.value)}} placeholder='Short Description' className='field-transparent' type="text" />
            <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder='Long Description' className='field-transparent' cols="30" rows="10"></textarea>
        </div>
      </div>
    <div className='bottom-buttons'>
        <p className='message flex1 '>{message}</p>
        <button onClick={() => {addCertification()}} className='submit-btn'>Submit</button>
    </div>

    </div>
  )
}

export default AddCertification

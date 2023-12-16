import React, { useContext, useState } from 'react'
import './AddProject.scss'
import ExperienceSkillTag from '../../Components/ExperienceSkillTag/ExperienceSkillTag'
import ProjectImage from '../../Components/ProjectImage/ProjectImage'
import { UserContext } from '../../Context/UserContext'
import { UploadFile } from '../../Firebase/FirebaseController';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../../url'

const AddProject = () => {

  const {user} = useContext(UserContext);

  const [title,setTitle] = useState('')
  const [category,setCategory] = useState('')
  const [githubUrl,setGitHubUrl] = useState('')
  const [deploymentUrl,setDeploymentUrl] = useState('')
  const [startDate,setStartDate] = useState('')
  const [endDate,setEndDate] = useState('')
  const [shortDescription,setShortDescription] = useState('')
  const [description,setDescription] = useState('')

  const [skill,setSkill] = useState('')
  const [skills,setSkills] = useState([])

  const [logo,setLogo] = useState('');
  const [newLogo,setNewLogo] = useState('')
  const [logoUploadPerc, setLogoUploadPerc] = useState(0);
  const [logoUrl,setLogoUrl] = useState('')

  const [video,setVideo] = useState('')
  const [newVideo,setNewVideo] = useState('')
  const [videoUploadPerc, setVideoUploadPerc] = useState(0);
  const [videoUrl,setVideoUrl] = useState('')

  const [images, setImages] = useState([]);
  const [image,setImage] = useState('');
  const [imageUploadPerc,setImageUploadPerc] = useState(0);

  const [message,setMessage] = useState('');

  const navigate = useNavigate();

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

  // Handling Skills add and delete operations
  const handleAddImage = (url) => {
    const temp = [...images];
    temp.push(url);
    setImages(temp);
    console.log(images);
  }

  const handleDeleteImage = (index) => {
    const temp = [...images];
    temp.splice(index,1);
    setImages(temp)
    console.log(images);
  }

  // Firebase Upload
  const uploadLogo = () => {
    if(newLogo){
      const logoDestination = `projects/${user._id}/projectlogos/${new Date().getTime().toString()+newLogo.name}`;
      UploadFile(newLogo,logoDestination,setLogoUploadPerc,setLogo,setLogoUrl);
    }
  }

  const uploadImage = async () => {
    if(image){
      const imageDestination = `projects/${user._id}/projectImages/${new Date().getTime().toString()+image.name}`;
      UploadFile(image,imageDestination,setImageUploadPerc,setImage,handleAddImage);
    }
  }

  const uploadVideo = async () => {
    if(newVideo){
      const videoDestination = `projects/${user._id}/projectVideos/${new Date().getTime().toString()+video.name}`;
      UploadFile(newVideo,videoDestination,setVideoUploadPerc,setVideo,setVideoUrl);
    }
  }

  // Adding Project Functionality
  const addProject = async () => {
    const obj = {
      title,
      category,
      imagesUrl:images,
      logoUrl,
      videoUrl,
      githubUrl,
      deploymentUrl,
      skillsUsed:skills,
      shortDescription,
      description,
      startDate,
      endDate
    }
    try {
      await axios.post(`${BASE_URL}/projects/add`,obj,{withCredentials:true})
        .then((res) => {
          const data = res.data;
          if(data){
            console.log(data)
            navigate('/projects');
          }
        })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='add-project'>
      <h1 className='title'>Add Project</h1>
      <div className='project-details section-border'>
        <div className='project-info flex3'>
            <h1>Project Details</h1>
            <input value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder='Title' className='field-transparent' type="text" />
            <input value={category} onChange={(e) => {setCategory(e.target.value)}} placeholder='Category' className='field-transparent' type="text" />
            <input value={githubUrl} onChange={(e) => {setGitHubUrl(e.target.value)}} placeholder='Github' className='field-transparent' type="text" />
            <input value={deploymentUrl} onChange={(e) => {setDeploymentUrl(e.target.value)}} placeholder='Deployment' className='field-transparent' type="text" />
        </div>
        <div className='duration flex2'>
          <h1>Duration</h1>

          <label htmlFor="startD">Start Date: {startDate}</label>
          <input onChange={(e) => setStartDate(e.target.value)} name='startD' className='field-transparent' type="date" />

          <label htmlFor="endD">End Date: {endDate}</label>
          <input onChange={(e) => setEndDate(e.target.value)} name='endD' className='field-transparent' type="date" />
        </div>
      </div>
      <div className='media-upload'>
        <h1>Media Upload</h1>
        <div className='logo-video-upload'>
            <div className='upload-container flex1'>
                <h2>Logo Upload</h2>
                <h3>Upload Progress: {logoUploadPerc}%</h3>
                <img value={logo} src={logo} alt="logo" />
                <input onChange={(e) => setNewLogo(e.target.files[0])} type="file"accept="image/*" />
                <button onClick={() => (uploadLogo())}>Upload Logo</button>
            </div>
            <div className='upload-container flex1'>
                <h2>Video Upload</h2>
                <h3>Upload Progress: {videoUploadPerc}%</h3>
                <video value={video} src={video} width="320" height="240" controls></video>
                <input onChange={(e) => setNewVideo(e.target.files[0])} type="file" accept="video/*" />
                <button onClick={() => uploadVideo()}>Upload Video</button>
            </div>
        </div>
        <div className='image-upload section-border'>
            <h2>Image Upload</h2>
            <div className='image-upload-field'>
              <input onChange={(e) => setImage(e.target.files[0])} placeholder='Title' className='field-transparent flex1' type="file" accept="image/*" />
              <button onClick={() => {uploadImage()}}>Upload Image</button>
            </div>
            <h2>Upload Progress: {imageUploadPerc}%</h2>
            <div className='image-container'>

              {
                images.length === 0
                ?<p>No Images Added</p>
                :images.map((item,index) => {
                  return <ProjectImage key={index} index={index} imageUrl={item} func={handleDeleteImage}></ProjectImage>
                })
              }
            </div>
        </div>
      </div>
      <div className='project-bottom'>
        <div className='project-skills section-border flex2'>
            <h1>Skills Used</h1>
            <input value={skill} onChange={(e) => {setSkill(e.target.value)}} onKeyUp={(e) => {handleAddSkill(e.key)}} placeholder='Add Skills' className='field-transparent' type="text" />
            <div className='skills-container'>
              {
                skills.map((item,index) => {
                  return <ExperienceSkillTag key={index} tag={item} color='red' onDelete={() =>{handleDeleteSkill(index)}}></ExperienceSkillTag>
                })
              }
            </div>
        </div>
        <div className='description section-border flex3'>
            <h1>Description</h1>
            <input value={shortDescription} onChange={(e) => {setShortDescription(e.target.value)}} placeholder='Short Description' className='field-transparent' type="text" />
            <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder='Long Description' className='field-transparent' cols="30" rows="10"></textarea>
        </div>
      </div>
    <div className='bottom-buttons'>
        <p className='message flex1 '>{message}</p>
        <button className='submit-btn' onClick={() => (addProject())}>Submit</button>
    </div>

    </div>
  )
}

export default AddProject

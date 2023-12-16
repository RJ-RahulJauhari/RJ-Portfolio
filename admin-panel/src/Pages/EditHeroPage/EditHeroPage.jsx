import React, { useContext, useEffect, useState } from 'react'
import './EditHeroPage.scss'
import SocialLinks from '../../Components/SocialLinks/SocialLinks'
import {UploadFile} from '../../Firebase/FirebaseController';
import { UserContext } from '../../Context/UserContext'
import axios from 'axios';
import { BASE_URL } from '../../url';

const EditHeroPage = () => {

  useEffect(() => {
    getHeroData();
  },[]);

  const getHeroData = async () => {
      await axios.get(`${BASE_URL}/users/hero`)
      .then((res) => {
        const data = res.data;

        setName(data.name);
        setCurrentDesignation(data.currentDesignation)
        setEmail(data.email);
        setPhone(data.phone);
        setDate(data.dob);
        setLocation(data.location);
        setSocialMediaLinks(data.social);
        setCurrentProfilePhoto(data.photoUrl);
        setCurrentCoverPhoto(data.coverUrl);
        setTagline(data.tagline);
        setDescription(data.description);

      }).catch((err) =>{
        console.log(err);
      })
  }


  const [name,setName] = useState('');
  const [currentDesignation,setCurrentDesignation] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [date,setDate] = useState("");
  const [location,setLocation] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [socialMediaLinks,setSocialMediaLinks] = useState([]);


  const [profilePhoto,setProfilePhoto] = useState("");
  const [currentProfilePhoto,setCurrentProfilePhoto] = useState("");
  const [profilePhotoUploadPerc,setProfilePhotoUploadPerc] = useState(0);
  const [profilePhotoURL, setProfilePhotoURL] = useState();


  const [coverPhoto,setCoverPhoto] = useState("");
  const [currentCoverPhoto,setCurrentCoverPhoto] = useState("");
  const [coverPhotoUploadPerc,setCoverPhotoUploadPerc] = useState(0);
  const [coverPhotoURL, setCoverPhotoURL] = useState();

  const [resume,setResume] = useState("");
  const [currentResume,setCurrentResume] = useState("");
  const [resumeUploadPerc,setResumeUploadPerc] = useState(0);
  const [resumeURL, setResumeURL] = useState();



  const [tagline,setTagline] = useState("");
  const [description,setDescription] = useState("");
  const [message,setMessage] = useState("");

  // const [updatedUser,setUpdatedUser] = useState({});
  const [updated,setUpdated] = useState(false);

  const {user} = useContext(UserContext);



  const uploadProfilePhoto = () => {
    const profilePhotoDestination = `users/${user._id}/profileImage/${profilePhoto.name}`
    UploadFile(profilePhoto,profilePhotoDestination,setProfilePhotoUploadPerc,setProfilePhotoURL,setProfilePhoto);
    
  }

  const uploadCoverPhoto = () => {
    const coverPhotoDestination = `users/${user._id}/coverImage/${coverPhoto.name}`
    UploadFile(coverPhoto,coverPhotoDestination,setCoverPhotoUploadPerc,setCoverPhotoURL,setCurrentCoverPhoto);
  }

  const uploadResume = () => {
    const resumeDestination = `users/${user._id}/resume/${resume.name}`
    UploadFile(resume,resumeDestination,setResumeUploadPerc,setResumeURL,setResume);
    
  }

  const addSocialLink = () => {
    socialMediaLinks.push(socialMediaLink);
    setSocialMediaLink("")
    console.log(socialMediaLinks)
  }

  const deleteSocialLink = (index) => {
    const temp = [...socialMediaLinks];
    temp.splice(index,1);
    setSocialMediaLinks(temp);
    console.log(socialMediaLinks);
  }


  const updateMongoDB = async (updatedData) => {
    try {
      await axios.patch(`${BASE_URL}/users/hero/update`,updatedData,{withCredentials:true})
      .then((res) =>{
        console.log(res.data);
        setMessage(res.data);
      }).catch((err) =>{
        console.log(err);
        setMessage(err.response.data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Fetch data only when the updated flag is set
    if (updated) {
      getHeroData();
      setUpdated(false); // Reset the flag after fetching data
    }
  }, [updated]);

  const updateUserInfo = async () => {
    try {
        const obj = {
          name,
          email,
          phone,
          currentDesignation,
          location,
          photoUrl: profilePhotoURL,
          coverUrl: coverPhotoURL,
          dob: date,
          social: socialMediaLinks,
          tagline,
          description,
          resume : resumeURL
        };
      await axios.patch(`${BASE_URL}/users/hero/update`,obj,{withCredentials:true})
      .then((res) =>{
        console.log(res.data);
        setMessage(res.data);
        setUpdated(true);
      }).catch((err) =>{
        console.log(err);
        setMessage(err.response.data);
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className='edit-hero-container'>

      {/* Personal Info Section */}

      <div className='personal-info-section '>

        {/* Personal Details */}
        <div className='personal flex1'>
          <h1>Personal Info</h1>
          <input value={name} onChange={(e) => {setName(e.target.value)}} className='field-transparent' placeholder='Name' type="text" />
          <input value={currentDesignation} onChange={(e) => {setCurrentDesignation(e.target.value)}} className='field-transparent' placeholder='Current Designation' type="text" />
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} className='field-transparent' placeholder='Email' type="email" />
          <input value={phone} onChange={(e) => {setPhone(e.target.value)}} className='field-transparent' placeholder='Phone' type="number" />
          <input value={date} onChange={(e) => {setDate(e.target.value)}} className='field' placeholder='Date' type="date" />
          <input value={location} onChange={(e) => {setLocation(e.target.value)}} className='field-transparent' placeholder='Location' type="text" />
        </div>

        {/* Social Media Info */}
        <div className='social-media-info-section flex1'>
          <h1>Social Media</h1>
          <div className='social-media-input'>
            <input value={socialMediaLink} onChange={(e) => {setSocialMediaLink(e.target.value)}} placeholder='Add Social Link' type="text" className='field flex4' />
            <button onClick={() => {addSocialLink()}} className='flex1'>Add</button>
          </div>
          <div className='social-media-display'>
            {
              socialMediaLinks.map((link,index) => {
                return <SocialLinks delfunc={deleteSocialLink} key={index} customKey={index} value={link} url={link}></SocialLinks>
              })
            }
          </div>
        </div>

      </div>

      <div className='upload-resume section-border'>
          <h1>Upload Resume</h1>
          <label htmlFor="profile-photo">Resume: </label>
          <input onChange={(e) => setResume(e.target.files[0])} className='field' name='profile-photo' type="file" accept="/*" />
          <div className='upload-controller'>
            <p>Resume Upload: {resumeUploadPerc}%</p>
            <p onClick={() => {if(resume){uploadResume()}}} className='controller hoverable scale-up'>Upload Resume</p>
          </div>
      </div>

      <div className='media-desc-container '>
        {/* Upload Media Section  */}
        <div className='upload-media-section flex2'>
          <h1>Upload Media</h1>

          <img className='photo-display' src={currentProfilePhoto} alt="" />
          <label htmlFor="profile-photo">Profile Photo: </label>
          <input onChange={(e) => setProfilePhoto(e.target.files[0])} className='field' name='profile-photo' type="file" accept="image/*" />
          <div className='upload-controller'>
            <p>Profile Upload: {profilePhotoUploadPerc}%</p>
            <p onClick={() => {if(profilePhoto){uploadProfilePhoto()}}} className='controller hoverable scale-up'>Upload Profile Picture</p>
          </div>

          <br></br>          
          
          <img className='photo-display' src={currentCoverPhoto} alt="" />
          <label htmlFor="cover-photo"> Cover Photo: </label>
          <input onChange={(e) => setCoverPhoto(e.target.files[0])} className='field' name='cover-photo' type="file" accept="image/*" />
          <div className='upload-controller'>
            <p>Cover Upload: {coverPhotoUploadPerc}%</p>
            <p onClick={() => {if(coverPhoto){uploadCoverPhoto()}}} className='controller hoverable scale-up'>Upload Cover Picture</p>
          </div>
        </div>

        {/* Description and Tagline Section */}
        <div className="descriptions flex3">
          <h1>Description and Tagline</h1>
          <input value={tagline} onChange={(e) => {setTagline(e.target.value)}} className='field-transparent tagline' placeholder='Tagline' type="text" name="tagline" id="" />
          <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} className='field-transparent description' placeholder='Enter your description...' rows={60} cols={60}  style={{resize: 'both'}}></textarea>
        </div>
      </div>
      <div className='update-control'>
        <p className='update-message-field'>{message}</p>
        <button onClick={() => {updateUserInfo()}} className='update-button'>Update</button>
      </div>

    </div>
  )
}

export default EditHeroPage


// WITH CREDRENTIAL OPTION SHOULD BE ENABLED WITH AXIOS API FETCHING WHILE USING JSONWEBTOKENS
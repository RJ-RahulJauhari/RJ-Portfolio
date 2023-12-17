import React from 'react'
import ImageCarousel from '../../Components/ImageCarousel/ImageCarousel'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../../url';
import { useEffect } from 'react';
import { useState } from 'react';
import './ViewProjectPage.scss'
import { SocialIcon } from 'react-social-icons'
import Icon from '../../Components/Icon/Icon'
import Tag from '../../Components/Tag/Tag';
import SkillsTag from '../../Components/SkillsTag/SkillsTag';
import ReactPlayer from 'react-player'

const ViewProjectPage = () => {

  const [data,setData] = useState({});

  const projectId = useParams().id;
  useEffect(() => {
    getProjectById();
  },[])

  const getProjectById = async () => {
    await axios.get(`${BASE_URL}/projects/get/${projectId}`)
    .then((res) => {
      const data = res.data;
      if(data){
        setData(data)
        console.log(data.imagesUrl) 
      }
      console.log(data)
    })
  }

  return (
    <div className='view-project-page full-width'>
      <div className='top-details gap3'>
        {
          data.imagesUrl && data.imagesUrl.length > 0 
          ? <div className='flex2'>
              <ImageCarousel width={'520px'} images={data.imagesUrl} stopOnHover={true} swipeble={true} infiniteLoop={true} autoplay={true} interval={4000}></ImageCarousel>
            </div>
          : ""
        }
        <div className='project-info flex3'>
          <div className='flex-row center full-width'>
            <div className='logo flex1'>
              <img src={data.logoUrl} alt="" />
            </div>
            <div className='flex4 center-content'>
              <p className='title'>{data.title}</p>
            </div>
          </div>
          <div className='row-space-between full-width'>
            <p className='duration'>{new Date(data.startDate).toDateString()} - {new Date(data.endDate).toDateString()}</p>
            <Tag tag={data.category}></Tag>
          </div>
          {
            data.skillsUsed && data.skillsUsed.length > 0
            ?
            <div className='skills-container flex-row gap1 center-content'>
              {
                data.skillsUsed.map((item,index) => {
                  return <SkillsTag key={index} tag={item}></SkillsTag>
                })
              }
            </div>
            :'' 
          }
          <div className='summary full-width'>
            <p className='sub-heading'>Summary</p>
            {
              data.shortDescription
            }
          </div>
          <div className='icon-container'>
            <p className='normal-text'>Project Links: </p>
              {
                  data.deploymentUrl
                  ? <Icon iconUrl={data.logoUrl} url={data.deploymentUrl}></Icon>
                  : "" 
              }
              {
                  data.githubUrl
                  ? <SocialIcon target='_blank' url={data.githubUrl}></SocialIcon>
                  : "" 
              }
          </div>
        </div>
      </div>
      <div className='bottom-details'>
        <div className='video-player'>
        {
          data.videoUrl
          ? <ReactPlayer url={data.videoUrl} controls={true} width={'820'}></ReactPlayer>
          : ''
        }
        </div>
        <div>
          <p className='sub-heading'>Description</p>
          <p className='description'>{data.description}</p>
        </div>
      </div>
      <div className='spacer'></div>
    </div>
  )
}

export default ViewProjectPage

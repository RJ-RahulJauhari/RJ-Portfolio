import React, { useContext } from 'react'
import './CertificationPage.scss'
import CertificationCard from '../../Components/CertificationCard/CertificationCard'
import { HeroContext } from '../../Context/HeroContext'
import {useLocation} from 'react-router-dom'

const CertificationPage = () => {
  
  const {certifications} = useContext(HeroContext);
  const page = useLocation().pathname.substring(1);

  if (certifications){
    return (
      <div className='certification-page full-width'>
        
        {
          page === 'certifications'
          ?<div className='spacer'></div>
          :  <p className='title scale-up'>Certifications <br /> <span className='caption'>I am certified with...</span></p>
        }
        <div className='certification-container'>
          {
            certifications
            ? certifications.map((item,index) => {
              return <CertificationCard key={index} props={item}></CertificationCard>
            })
            : <p>No certifications found...</p>
          }
          
        </div>
      </div>
    )
  }else{
    return <p>Certifications can not be loaded at this time....</p>
  }

}

export default CertificationPage

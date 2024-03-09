import React, { useContext, useEffect, useState } from 'react'
import AnchorLink from "react-anchor-link-smooth-scroll";
import './HeroPage.scss'
import { HeroContext } from '../../Context/HeroContext';
import '../../animated-flicker-circle.scss'
import '../../animated-glowing-circle.scss'
import {useNavigate} from 'react-router-dom'



const HeroPage = () => {

    const {hero} = useContext(HeroContext);
    const navigate = useNavigate();

  return (
    <div style={hero?{background:`${hero.coverUrl}`}:{}} className='hero-section gap1 row-center full-width wrap flex-row'>
      <div className='hero-left full-height flex1 gap3 wrap'>
            <div className='welcome-lines wrap'>
                <p className='left'><span className='hero-line1'>Hi, I am</span></p>
                <p className='center hoverable scale-up'><span className='hero-line2'>Rahul Jauhari</span></p>
                {/* <p className='center'><span className='hero-line3'>and I am a</span></p>
                <p className='right'><span className='hero-line4'>Software Developer</span></p>  */}
            </div>
            <div className='hero-buttons row-center gap2 full-width wrap'>
              <AnchorLink href='#about'>
                <button className='primary-button'>Explore</button>
              </AnchorLink>
                {
                  hero
                  ? <a className='remove-link-decor' target='_blank' href={hero.resume}><button className='primary-button'>Get Resume</button></a>
                  : ''
                }
      
            </div>
      </div>
      <div className='hero-right center-content full-height '>
        <img className='hero-image full-cover-img scale-up' src={hero? hero.photoUrl:"Rahul's Image"} alt="Rahul's Image" />
      </div>
    </div>
  )
}

export default HeroPage

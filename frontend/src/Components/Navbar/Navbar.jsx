import React, { useContext,useState} from 'react'
import './Navbar.scss'
import { SocialIcon } from 'react-social-icons'
import {Link} from 'react-router-dom';
import { HeroContext } from '../../Context/HeroContext';

const Navbar = () => {

  const {hero} = useContext(HeroContext);
  const [pageTitle,setPageTitle] = useState('Portfolio');

  return (
    <div className='navbar full-width'>
      <div className='top-navbar row-space-between'>
        <div className='logo flex4'>
          <p className='heading hoverable'>{pageTitle}</p>
        </div>
        <div className='social-icons flex1 row-center gap2'>
          {
            hero
            ? (hero.social).map((item,index) => {
              return <SocialIcon key={index} url={item}></SocialIcon>
            })
            : ''
          }
        </div>
      </div>
      <div className='bottom-navbar full-width row-space-evenly'>
        <Link onClick={() => {setPageTitle('Portfolio')}} to={'/'} className='tab remove-link-decor clickable hoverable scale-up'><p>Home</p></Link>
        <Link onClick={() => {setPageTitle('About')}} to={'/about'} className='tab remove-link-decor clickable hoverable scale-up'><p>About</p></Link>
        <Link onClick={() => {setPageTitle('Skills')}} to={'/skills'} className='tab remove-link-decor clickable hoverable scale-up'><p>Skills</p></Link>
        <Link onClick={() => {setPageTitle('Experience')}} to={'/experiences'} className='tab remove-link-decor clickable hoverable scale-up'><p>Experience</p></Link>
        <Link onClick={() => {setPageTitle('Project')}} to={'/projects'} className='tab remove-link-decor clickable hoverable scale-up'><p>Projects</p></Link>
        <Link onClick={() => {setPageTitle('Certification')}} to={'/certifications'} className='tab remove-link-decor clickable hoverable scale-up'><p>Certifications</p></Link>
        <Link onClick={() => {setPageTitle('Contact Me')}} to={'/contact'} className='tab remove-link-decor clickable hoverable scale-up'><p>Contact</p></Link>
      </div>
      <div className='line full-width animated-bg'></div>
    </div>
  )
}

export default Navbar

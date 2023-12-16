import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../url';

const Navbar = () => {
  const {user,setUser,getUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/auth/logout`,{withCredentials:true})
        .then((res) => {
          console.log(res.data);
          setUser(null);
        })
    } catch (error) {
      console.log(error);
    }

  }

  if(user && user.userType === 'admin'){
    return (
      <div className='admin-navbar'>
        <div className='top-nav-admin '>
          <div className='admin-logo'>
            <h1 onClick={() => {navigate('/')}}>Welcome back, <span className='hero-name'>{user.name}</span></h1>
          </div>
          <div className='admin-nav-links'>
            <p onClick={() => handleLogout()} className='admin-link'>Logout</p>
          </div>
        </div>
        <div className='bottom-nav-admin'>
            <Link to={'/hero'} className='remove-link-decoration hoverable scale-up tab'><p>Hero</p></Link>
            <Link to={'/about'} className='remove-link-decoration hoverable scale-up tab'><p>About</p></Link>
            <Link to={'/skills'} className='remove-link-decoration hoverable scale-up tab'><p>Skills</p></Link>
            <Link to={'/experience'} className='remove-link-decoration hoverable scale-up tab'><p>Experience</p></Link>
            <Link to={'/projects'} className='remove-link-decoration hoverable scale-up tab'><p>Projects</p></Link>
            <Link to={'/certifications'} className='remove-link-decoration hoverable scale-up tab'><p>Certifications</p></Link>
            <Link to={'/contact'} className='remove-link-decoration hoverable scale-up tab'><p>Contact</p></Link>
            <Link to={'/blogs'} className='remove-link-decoration hoverable scale-up tab'><p>Blogs</p></Link>
        </div>
      </div>
    )
  }else if(user && user.userType === 'admin'){
    return(
      <div className='user-navbar '>
        <div className='logo flex2'>
          <h1>Blogs Panel</h1>
        </div>
        <div className='search flex4 '>
          <input className='field search-bar' placeholder='Search' type="text" />
        </div>
        <div className='user-nav-links flex2'>
          <p className='user-links'>Add Blog</p>
          <p onClick={() => handleLogout()} className='user-links'>Logout</p>
        </div>
      </div>
    )
  }else{
    setUser(null);
    navigate('/login');
  }
}

export default Navbar

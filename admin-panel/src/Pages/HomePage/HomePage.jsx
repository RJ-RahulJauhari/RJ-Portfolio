import React, { useContext, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HomePage = () => {
  const {user,setUser,getUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  return (
    <div>

    </div>
  )
}

export default HomePage

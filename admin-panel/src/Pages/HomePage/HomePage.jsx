import React, { useContext, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HomePage = () => {
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    console.log(process.env.REACT_APP_apiKey);
  },[])
  

  return (
    <div>

    </div>
  )
}

export default HomePage

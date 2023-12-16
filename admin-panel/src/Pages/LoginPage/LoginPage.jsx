import React, { useContext, useEffect, useState } from 'react'
import "./LoginPage.scss"
import axios from 'axios';
import { BASE_URL } from '../../url';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');
  const [error,setError] = useState(false);
  const {user,setUser,getUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/')
    }
  },[user])


  const handleAdminLogin = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/admin/login`,{email,password},{withCredentials:true})
      .then((res) =>{
        const data = res.data;
        if(data){
          console.log(data)
          setError(false)
          setMessage(`Successful Login by Admin`)
          navigate('/');
        } 
        })
    } catch (error) {
      setError(true);
      setMessage(error.response ? error.response.data : 'An error occurred')
      console.log(error)
    }
  }

  // const handleUserLogin = () => {
  //   navigate('/userLogin')
  // }

  return (
    <div className='login-page'>
        <div className='login-container'>
          <h1 className='login-welcome hoverable scale-up'>Hi, Rahul Jauhari glad to see you back...</h1>
            <div className="login-fields flex1">
              <h1 className='login-header hoverable scale-up'>Login to your Admin Panel</h1>
              <input onChange={(e) => {setEmail(e.target.value); setError(false); setMessage('')}} className='field cust' type="email" placeholder='Email' />
              <input onChange={(e) => {setPassword(e.target.value); setError(false); setMessage('')}} className='field cust' type="password" placeholder='Password' />
              <button onClick={() => {handleAdminLogin()}}>Login</button>
              {error?<p className='error-field'>{message}</p>:<p className='success-field'>{message}</p>}
            </div>
        </div>

    </div>
  )
}

export default LoginPage

import React,{useEffect, useState} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import BlogCard from '../../Components/BlogCard/BlogCard'
import './EditBlogsPage.scss'
import axios from 'axios';
import { BASE_URL } from '../../url';

const EditBlogsPage = () => {

  const [blogs,setBlogs] = useState([]);
  const [message,setMessage] = useState('');

  const getBlogs = async () => {
    try {
      await axios.get(`${BASE_URL}/blogs/getAllSorted`,{withCredentials:true})
      .then((res) => {
        const data = res.data;
        if(res.data){
          console.log(data);
          setBlogs(data);
        }
      })
    } catch (error) {
      console.log(error);
      setMessage(error.response.data);
    }
  }

  useEffect(() => {
    getBlogs()
  },[])
  
  
  return (
    <div className='edit-blog-page'>
      <h1 className='title'>Manage Blogs</h1>
      <div className='search-bar'>
        <input className='field-transparent' placeholder='Search' type="text" />
      </div>
      <div className='filter-bar'>
        <p className='filter-heading'>Filters</p>
        <p className='filter hoverable scale-up'>Approved</p>
        <p className='filter hoverable scale-up'>Not Approved</p>
        <p className='filter hoverable scale-up'>Latest</p>
      </div>
      <div className='blog-container'>
        {
          blogs.map((item,index) => {
            return <BlogCard id={item._id} key={index} props={item} func={() => {}} approve={() => {}} decline={() => {}} />
          })
        }
      </div>
    </div>
  )
}

export default EditBlogsPage

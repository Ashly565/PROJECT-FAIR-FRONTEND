import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function Header() {
  const [istoken,setIstoken] =useState(false)

  const navigate = useNavigate()
  const handleLogout = ()=>{
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if(confirmLogout && sessionStorage.getItem('token')){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('loggedUser')
      toast.success("logged out successfully")
      navigate('/')
      }
  }
  useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setIstoken(true)
      }
    },[])
  return (
    <>
    <Navbar className="bg-success">
        <Container className='p-1'>
          <Navbar.Brand >
            <Link to= {'/'} style={{textDecoration:"none"}} className='text-light'>
            <i className="fa-brands fa-stack-overflow me-2 text-warning"></i>
            Project Fair
            </Link>
          </Navbar.Brand>
          <button className='btn btn-warning' onClick={handleLogout}><i className="fa-solid fa-power-off me-2"  ></i>Logout</button>
         </Container>
     </Navbar>

    </>
  )
}

export default Header
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/allApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Auth({ register }) {
  const registerForm = register ? true : false;
  // use navigate hook is used to redirect to aa particular path
  const navigate=useNavigate()
  const [userData,setuserData]= useState({
    username:"",
    email:"",
    password:""
})

const handleRegister=async(e)=>{
  e.preventDefault();
  const {username,email,password} = userData;
if(!username || !email || !password){
  toast.warning("Please fill the form compleatly")
}else{
 const result = await registerApi(userData)
 console.log(result)
 if(result.status === 201){
   setuserData({
     username:"",
     email:"",
     password:""
   })
  toast.success(` ${username} registered successfully`)
  // navigate to login page on successfull user registration
  navigate('/login')
 }
 else if(result.status==400){
  toast.error(`${username} already exists`)
 }
 else{
  toast.error("Something went wrong")
 }
 console.log(result)
}
}

const handleLogin=async (e)=>{
  e.preventDefault();
 const {email,password}=userData;
 if(!email || !password){
  toast.warning("Please fill the form compleatly")
 }
 else{
  const result = await loginApi(userData)
  console.log("login result")
  console.log(result)
  if(result.status == 200){
    sessionStorage.setItem("loggeduser",JSON.stringify(result.data.data))
    sessionStorage.setItem('token',result.data.token);
    setuserData({
      username:"",
      email:"",
      password:""
    })
    toast.success("logged in successfully")
    navigate('/')
  }
  else if(result.status==401){
    toast.error("Invalid Email or Password")
  }
  else(toast.error("Something went wrong"))
 }
}

  return (
    <> 
      <div 
        style={{
          width: "100%",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >  
        <div className="container w-75">
          <h5>
            <Link to={'/'}className="text-warning me-5" style={{ textDecoration: "none" }}>
              <i class="fa-solid fa-arrow-left mb-3 me-2"></i>Back To Home
            </Link>
          </h5>
          <div className="bg-light">
            <Row>  
              <Col
                md={6}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  height="250px"
                  width="350px"
                  src="https://imgs.search.brave.com/BSqZZMZHL3KV8ap1xEnyLZpTMbON27JsbDSnMv2zen0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzcwLzkyLzg0/LzM2MF9GXzM3MDky/ODQ1MF9SNmc4YzBq/NWNleTg2UFVYRTMy/VzdLTWlxSVVlMWZP/SS5qcGc"
                  alt=""
                />
              </Col>
              <Col  md={6} className="p-4 d-flex justify-content-center">
              <form className="w-100">
                <h5 className="text-center"><i class="fa-brands fa-stack-overflow"></i>Project Fair</h5>
                { registerForm?
                <>
                <h6 className="text-center mt-4 ">Sign Up To Your account</h6>
                 <input type="text" name="" id="" placeholder="Name" className="form-control mt-3"
                 value={userData.username}
                 onChange={(e)=>setuserData({...userData,username:e.target.value})} />
                </>
                :
                <h6 className="text-center mt-3 ">Sign In To Your acoount</h6>

              }
              <div className="mb-3 mt-4">
                <input type="text" placeholder="Email id"  className="form-control rounded"
                 value={userData.email}
                 onChange={(e)=>setuserData({...userData,email:e.target.value})}/>
              </div>
              <div className="mt-3">
                <input type="password" placeholder="password"className="form-control rounded"
                value={userData.password}
                onChange={(e)=>setuserData({...userData,password:e.target.value})} />
              </div>
              {registerForm?
                  <div>
                    <button className="btn btn-warning mt-3 w-100 text-center"onClick={handleRegister} >REGISTER</button>
                    <p  className="mt-3 text-center me-3"style={{fontSize:"15px"}}>Already a  User? Click Here To
                       <Link to={'/login'} style={{fontSize:"15px",textDecoration:"none"}}> Login</Link></p>
                  </div>:
                  <div>
                    <button className="btn btn-warning mt-3 w-100" onClick={handleLogin}>LOGIN</button>
                    <p className="mt-3 text-center me-3">Not Registered yet? Click Here To
                      <Link to={'/register'} style={{fontSize:"15px",textDecoration:"none"}} > Regsiter</Link>
                    </p>
                  </div>
              }
              </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* <ToastContainer position="top-center" autoClose={2000} theme="colored" /> */}
    </>
  );
}

export default Auth;

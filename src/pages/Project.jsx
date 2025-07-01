import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import { getAllProjectApi } from "../services/allApi";
import { Link } from "react-router-dom";

function Project() {
  const [allProject,setAllProject] = useState([])
  const [searchKey,setSearchKey]=useState('')
  const [istoken,setIstoken] =useState(false)

  const getAllProject = async()=>{
    console.log("search key",searchKey)
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const requestHeader ={
        "Content-Type":'application',
        "Authorization":`Bearer ${token}`
      }
      const result = await getAllProjectApi(requestHeader,searchKey)
      console.log("user project");
      console.log(result)
      setAllProject(result.data)
    }
  }
  useEffect(()=>{
    getAllProject()
  },[searchKey])
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIstoken(true)
    }
  },[])
  return (
    <>
      <Header />
      <div className="container-fluid">
        <h3 className="text-center mt-5">All Projects</h3>
      </div>
      {
        istoken?
        <div>
         <div className="row my-4">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex">
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Search by Technology" onChange={(e)=>setSearchKey(e.target.value)}
          />
          <i
            class="fa-solid fa-magnifying-glass"
            style={{ marginLeft: "-25px", marginTop: "20px" }}
          ></i>
        </div>
        <div className="col-md-z"> </div>
       </div>

          <div className=" container row my-4 ms-4">
                        { 
                allProject.length>0?
                allProject.map((item)=>(
                  <div className="col-md-4 p-3">
                   <ProjectCard project={item}/>
                  </div>
                )):
                <p>No Projects Found</p>
              }
            </div>
       </div>:
<div className="d-flex justify-content-center align-items-center flex-column">
  <img className="mt-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Please_log_in_image.png/1200px-Please_log_in_image.png?20170326002341"  height ="270px" width="380px" alt="" />
 <p className="m-4">Please 
  <Link className="text-danger" to={'/login'}  style={{textDecoration:"none"}}> Login</Link> To View All Projects</p>
</div>
}  
       </>
  );
}

export default Project;

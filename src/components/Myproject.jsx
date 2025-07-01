import React, { useContext, useState } from "react";
import Addproject from "./Addproject";
import Editproject from "./Editproject";
import { deleteProjectApi, getUserProjectApi } from "../services/allApi";
import { useEffect } from "react";
import { addProjectResponseContext, editprojectResponseContext } from "../context/ContextShare";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Myproject() {
  const [userProject,setuserProject] = useState([])
  const {addProjectResponse,setAddProjectResponse} =useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(editprojectResponseContext)
  // to get user projects
  const getUserProjects = async()=>{
    const token = sessionStorage.getItem('token');
    const reqHeader={
      'Content-Type':'application/json', 
      'Authorization':`Bearer ${token}`
      }
      const result = await getUserProjectApi(reqHeader);
      console.log("user project")
      console.log(result)
      setuserProject(result.data)
      
  }
  useEffect(()=>{ 
    getUserProjects()
  },[addProjectResponse,editProjectResponse])

  // delete button
  const handleDelete =async(id) =>{
  const token = sessionStorage.getItem("token")
  const reqHeader={
    'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
  }
  console.log("reqHeader")
  console.log(reqHeader)
      const result = await deleteProjectApi(id,reqHeader)
      console.log("delete response")
      console.log(result)
      if(result.status===200){
         toast.success("project deleted successfully")
        // toast.success(`${item.title} deleted successfully`)
        getUserProjects();
      }
      else{
        toast.error("Something went wrong")
      }
  }
  return ( 
    <>
      <div className="shadow p-5 mb-5">
        <div className="d-flex mt-4">
          <h5 className="text-success me-auto">My projects</h5>
          <Addproject/>
        </div>
        {
           userProject?.length>0?
           userProject.map((item)=>(
             <div className="p-3 mt-4 rounded-2 d-flex bg-light">
           <h5>{item.title}</h5>

          <div className="d-flex ms-auto align-items-center">
           <Editproject project={item}/>
            
            <a href={item.website} target='_blank' className="ms-3 text-warning">
               <i class="fa-solid fa-link"></i>
            </a>
             <a href={item.github} target='_blank' className="ms-3 text-dark">
               <i class="fa-brands fa-github"></i>
            </a>
            <button className="btn text-danger ms-2" onClick={()=>handleDelete(item._id)}>
              <i class="fa-solid fa-trash"></i>
            </button>
    
          </div>

        </div>
           )):
         <p>No Projects Found</p>
        }
        
        
      </div>
    </>
  );
}
export default Myproject;

import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectApi } from '../services/allApi';
import { useContext } from 'react';
import { editprojectResponseContext } from '../context/ContextShare';

function Editproject({project}) {
      const [show, setShow] = useState(false);
      const [preview,setPreview] = useState("")
      // accessing contextshare
      const {editProjectResponse,setEditProjectResponse} = useContext(editprojectResponseContext)

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);    
        const [projectDetails,setProjectDetails] =useState({
          id:project._id,
          title:project.title,
          language:project.language,
          github:project.github,
          website:project.website,
          overview:project.overview,
          projectImage:""
        }) 
         const handleUpdate = async(e)=>{
          e.preventDefault();
          console.log("update values");
          console.log(projectDetails);
          const {title,language,github,website,overview,projectImage,id} = projectDetails;
              if(!title || !language || !github || !website || !overview || !id ){
                toast.warning("please fill the form compleatly")
              }else{
                 const reqBody = new FormData();
               reqBody.append("title",title)
               reqBody.append("language",language)
               reqBody.append("github",github)
               reqBody.append("website",website)
               reqBody.append("overview",overview)
               preview ? reqBody.append("projectImage",projectImage ):
               reqBody.append('projectImage',project.projectImage)
              const token =sessionStorage.getItem("token");
              if(preview){
                // for changing values with image
                const reqHeader={
                'Content-Type':'multipart/form-data',
                'Authorization':`Bearer ${token}`
                }
                const result = await editUserProjectApi(id,reqBody,reqHeader);
                console.log("update project result")
                console.log(result)
                if(result.status === 200){
                  toast.success("Project Updated successfully")
                  handleClose();
                  setEditProjectResponse(result)
                }
              }
              //  for changing only values 
              else{
                const reqHeader ={
                  'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
                }
                const result = await editUserProjectApi(id,reqBody,reqHeader)
                console.log("update project result")
                console.log(result)
                 if(result.status === 200){
                   handleClose()
                   toast.success("Project Updated successfully")
                   setEditProjectResponse(result)
                }
              }
              }
         }
         useEffect(()=>{
          if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
          }
         },[projectDetails.projectImage])
         const handleClose1 = ()=>{
         handleClose();
          setProjectDetails({
          id:project._id,
          title:project.title,
          language:project.language,
          github:project.github,
          website:project.website,
          overview:project.overview,
          projectImage:""
          })
          setPreview("")
         }
  return (
   <>
   <i class="fa-solid fa-pen-to-square text-primary" onClick={handleShow}></i>
   <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="projectImg">
                        <input type="file" style={{display:"none"}} id="projectImg" 
                         onChange={(e)=>{setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}}/>
                        <img className='w-75 ms-4 mt-5'
                        src={preview? preview:`${BASE_URL}/uploads/${project?.projectImage}`} alt="" />
                    </label>
                </div>

                <div className="col-md-6">
                  <input type="text" value={projectDetails.title} placeholder='Project Title' className='form-control' 
                  onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
                   <input type="text" value={projectDetails.language}  placeholder='Languages used' className='form-control mt-3' 
                   onChange={(e)=>{setProjectDetails({...projectDetails,language:e.target.value})}}
                   />
                   <input type="text" value={projectDetails.github}  placeholder='Github Link' className='form-control mt-3' 
                   onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}
                   />
                   <input type="text"  value={projectDetails.website}  placeholder='Website Link' className='form-control mt-3' 
                   onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}
                   />
                   <textarea name=""  value={projectDetails.overview}  placeholder='Project Overview ' className='form-control mt-3' id=""
                   onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}
                   ></textarea>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            CANCEL
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
       
   </>
  )
}

export default Editproject
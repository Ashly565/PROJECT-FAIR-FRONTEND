import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from "../services/allApi";
import { addProjectResponseContext } from '../context/ContextShare';
function Addproject() {  
     
    const [show, setShow] = useState(false);
    const [token ,setToken] =useState("")
    // use context hook is used to access state created inside contextshare
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    
    const [projectDetails,setprojectDetails]=useState({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    });

  // state for showing previewimage
  const [preview, setPreview]=useState("");

  useEffect(()=>{
    // console.log("project details")
    // console.log(projectDetails)
    if(projectDetails.projectImage){
      // default method for creating image url for preview URL.createobjectURL('image value')
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  const handleAddProject = async(e)=>{
    e.preventDefault();
    const {title,language,github,website,overview,projectImage} = projectDetails;
    if(!title || !language || !github || !website || !overview || !projectImage ){
      toast.warning("please fill the form compleatly")
    }else{
      // here we are also  uploading a file, so we should send body in  the form of formData.
      // FormData automatically sets the correct multipart/form-data header.
      // creating formData
      const reqBody = new FormData();
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage )

      // here content type we are passing is multipart/formData ,so specific req header is needed
      const reqHeader = {
        'Content-Type':'multipart/form-data',
        'Authorization':`Bearer ${token}`
      }
      const result = await addProjectApi(reqBody,reqHeader)
      if(result.status === 200){
        setAddProjectResponse(result.data)
      toast.success(`${title} uploaded successfully`)
      setprojectDetails(
        {
          title:"",
          language:"",
          github:"",
          website:"",
          overview:"",
          projectImage:""
        }
      )
      setPreview("")
      handleClose()
      }
      else if(result.status === 409){
        toast.warning(`${title} Already exists`)
      }
      else{
        toast.error(`${title} uploaded failed`)
      }
    }
  }
  const handleClose1=()=>{
    handleClose();
    setPreview('')
    setprojectDetails(
      {
        title:"",
        language:"",
        github:"",
        website:"",
        overview:"",
        projectImage:""
      }
    )
  }
  return (      
    <>
    <button className='btn btn-success' onClick={handleShow}>Add Project</button>
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="projectImg">
                        <input type="file" style={{display:"none"}} id="projectImg" 
                        onChange={(e)=>setprojectDetails({...projectDetails,projectImage:e.target.files[0]})}
                        />
                        <img className='w-75 ms-4 mt-5'
                        src={preview?preview:"https://imgs.search.brave.com/VSLi9jSoG-pn_vdjTbeywhjH7vIJLtle5wtWJGKkeCo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly95b3Vy/aW1hZ2VzaGFyZS5j/b20vaW1hZ2VzL3Nl/Y3Rpb25zL3VwbG9h/ZC5zdmc"} alt="" />
                    </label>
                </div>

                <div className="col-md-6">
                  <input type="text" placeholder='Project Title' 
                   value={projectDetails.title}
                   onChange={(e)=>setprojectDetails({...projectDetails,title:e.target.value})}
                  className='form-control mt-3' />

                  <input type="text" placeholder='Languages Used'
                  value={projectDetails. language}
                  onChange={(e)=>setprojectDetails({...projectDetails, language:e.target.value})}
                   className='form-control mt-3' />

                   <input type="text" placeholder='Github Link'
                    value={projectDetails. github}
                    onChange={(e)=>setprojectDetails({...projectDetails, github:e.target.value})}
                   className='form-control mt-3' />

                   <input type="text" placeholder='Website Link' 
                    value={projectDetails.website}
                    onChange={(e)=>setprojectDetails({...projectDetails,website:e.target.value})}
                   className='form-control mt-3' />

                   <textarea name="" placeholder='Project Overview '
                    value={projectDetails.overview}
                    onChange={(e)=>setprojectDetails({...projectDetails,overview:e.target.value})}
                   className='form-control mt-3' id=""></textarea>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            CANCEL
          </Button>
          <Button variant="success" onClick={handleAddProject}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
} 


export default Addproject
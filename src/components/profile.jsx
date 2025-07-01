import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';


function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div className="shadow p-4">
      <div className="d-flex ">
        <h5>Profile</h5>
        <button className='ms-auto btn btn-primary' onClick={() => setOpen(!open)}>
        {open?
          <i class="fa-solid fa-angle-up"></i>:
          <i class="fa-solid fa-angle-down"></i>
        }
          </button>

      </div>
      <Collapse in={open}>
        <div >
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <label htmlFor="profileimg">
                  <input type="file" id="profileimg" style={{display:"none"}} />
                  <img height={170} width={165} style={{borderRadius:"50%"}}
                   src="https://imgs.search.brave.com/O6rLvO8-5IAjWakgOKrUpBMPRo2IDSw78luSsXhnQbs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8zMC0z/MDc0MTZfcHJvZmls/ZS1pY29uLXBuZy1p/bWFnZS1mcmVlLWRv/d25sb2FkLXNlYXJj/aHBuZy1lbXBsb3ll/ZS5wbmc" alt="" />
                </label>
              </div>
              <div>
                <input type="text" placeholder='Github Link' className='form-control mt-3 '  />
                <input type="text" placeholder=' Linked-in Link' className='form-control mt-3 mb-3'  />
                <button className='btn btn-primary w-100'>UPDATE</button>
              </div>
            </div>
        </div>
          
      </Collapse>
    </div>
    </>
  )
}

export default Profile
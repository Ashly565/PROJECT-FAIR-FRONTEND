import React, { createContext, useState } from 'react'

 export const addProjectResponseContext = createContext()
 export const editprojectResponseContext = createContext()

function ContextShare({children}) {
    // children is pre-defined props name that is used to share data between components
    // create a  state tha need to be shared;
    const [addProjectResponse,setAddProjectResponse] = useState({});
    const [editProjectResponse,setEditProjectResponse] = useState({});
  return (
   <>
       <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
        <editprojectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
         {children}
        </editprojectResponseContext.Provider>
       </addProjectResponseContext.Provider>
   </>
  )
}

export default ContextShare
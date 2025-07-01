import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center bg-success p-3'>
      <div className='footer d-flex align-items-center justify-content-evenly'>
         <div style={{width:'400px'}}>
          <h5 className='textStyle'><i class="fa-brands fa-stack-overflow me-2"></i>Ptoject Fair</h5>
          <p style={{textAlign:'Justify'}} className='textStyle'>Lorem ipsum, dolor sit  consectetur adipisicing elit. Quo deleniti ullam officiis, quam rerum nam eaque inventore ab debitis temporibus cupiditate ipsam recusandae. Reprehenderit animi cumque eius eum culpa sunt?</p>
        </div>
        
        <div className='d-flex flex-column ms-5'>
          <h4 className='textStyle'>links</h4>
        <Link to='/' style={{textDecoration:'none',color:'black'}} >
        Home
        </Link>
       <Link to='/dashboard' style={{textDecoration:'none',color:'black'}}>
        Dashboard
        </Link>
        
        <Link to='/projects' style={{textDecoration:'none',color:'black'}}>
        Projects
        </Link>
        </div>
        
        <div className='d-flex flex-column ms-5'>
         <h4 className='textStyle'>Guides</h4>
          <Link to='https://vitejs.dev/guide/' style={{textDecoration:'none',color:'black'}}>
        React
        </Link>

       <Link to='https://react-bootstrap.netlify.app/' style={{textDecoration:'none',color:'black'}}>
        React bootstrap
        </Link>
        
        <Link to='https://www.npmjs.com/package/json-server' style={{textDecoration:'none',color:'black'}}>
        Json server
        </Link>
        </div>

        <div className='ms-5 mt-2'>
          <h4 className='textStyle'>Contact Us</h4>
          <div className='d-flex'>
            <input type="text"   className='form-control' placeholder='Enter your email Id'/>
            <button className='btn btn-warning ms-2'>SUBSCRIBE</button>
            </div>
           
            <div className='d-flex  justify-content-evenly align-items-center  mt-3 '>
            <Link style={{textDecoration:'none',color:'white'}}>
            <i className="fa-brands fa-facebook fa-2x"></i>
            </Link>
            <Link style={{textDecoration:'none',color:'white'}}>
            <i className="fa-brands fa-square-twitter fa-2x "></i>
            </Link>
            <Link style={{textDecoration:'none',color:'white'}}>
            <i className="fa-brands fa-instagram fa-2x"></i>
            </Link>
            <Link style={{textDecoration:'none',color:'white'}}>
            <i className="fa-brands fa-whatsapp fa-2x"></i>
            </Link>
            </div>
        </div>
        
        </div>
     </div>
    
    </>
  )
}

export default Footer
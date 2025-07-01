import React from 'react'
import Card from 'react-bootstrap/Card';
import media_img from '../assets/img2.jpeg'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
     <Card style={{ width: '100%' }} onClick={handleShow} >
      <Card.Img variant="top" src={`${BASE_URL}/uploads/${project.projectImage}`} height='180px' />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
    
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                <img src={`${BASE_URL}/uploads/${project.projectImage}`} alt="" width="96%" height="90%" />
                </Col>
                <Col md={6}>
                <h4 className='text-primary'>Description:</h4>
                <p>{project.overview}</p>
                <h4 className='text-primary'>Technologies:</h4>
                <p> {project.language}</p>
                </Col>
            </Row>
        </Modal.Body>
        <div className='d-flex ms-3 mb-3'>
            <Link className='ms-3' to={project.github} target='_blank'>
            <i class="fa-brands fa-github fa-2x text-dark "></i>
            </Link>
            <Link to={project.website} target='_blank'>
            <i class="fa-solid fa-link fa-2x ms-3 text-dark"></i>
            </Link>
            
        </div>
      </Modal>
    </>
  )
}

export default ProjectCard
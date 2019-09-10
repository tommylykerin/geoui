import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createProjectAction } from './actions';
import { getBase64Image } from '../../includes/utils';

const Home: React.FC = () => {
    const home = useSelector((state: any) => state.home);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
        setProjectTitle('');
        setProjectDescription('');
        setProjectImage('');
    }
    const handleShow = () => setShowModal(true);

    const dispatch = useDispatch();
    const createProject = (title: string, description: string, image: any) => dispatch(createProjectAction(title, description, image));

    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectImage, setProjectImage] = useState('');

    const handleCreateProject = (e: any) => {
        e.preventDefault();
        createProject(projectTitle, projectDescription, projectImage);
    }

    useEffect(
        () => console.log("ImageDataURL: " + projectImage),
        [projectImage]
    );

    const setImages = (e: any) => {
        e.preventDefault();
        setProjectImage(''); // empty out current image
        const imageFiles = e.target.files; // document.getElementById("image"); // You may want to avoid querying the dom yourself, try and rely on react as much as possible
        const filesLength = imageFiles.length; // imageFiles.files.length;
        // const temp = null;

        for (var i = 0; i < filesLength; i++) {
            let reader: any = new FileReader();
            let file = imageFiles[i];

            reader.onloadend = () => {
                setProjectImage(reader.result);
            }

            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="My projects" />
                    </Col>
                </Row>
                <div className="clearfix"></div>
                <Row className="mt-4 text-center">
                    <Col md={4} lg={3}>
                        <Card className="shadow" onClick={handleShow}>
                            <Card.Body><FontAwesomeIcon icon="plus" size="10x" /></Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleClose} centered>
                <Form onSubmit={handleCreateProject}>
                    <Modal.Header closeButton>
                        <Modal.Title className="ml-auto">CREATE NEW PROJECT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="projectTitle">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control type="text" placeholder="Simple title"
                                value={projectTitle} onChange={(e: any) => setProjectTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="projectDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Project description..."
                                value={projectDescription} onChange={(e: any) => setProjectDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="projectImage">
                            <Form.Label>Associated Image</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={(e: any) => setImages(e)} />
                            <Col className="p-3">
                                {
                                    projectImage != '' &&
                                    <Button variant="danger" onClick={() => {setProjectImage('')}} >
                                        X
                                    </Button>
                                }
                                <Image src={`${projectImage}`} rounded style={{maxWidth: '100%'}} />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            CANCEL
                        </Button>
                        <Button variant="primary" type="submit">
                            <strong>{home.creatinProject ? 'loading...' : 'CREATE PROJECT'}</strong>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Home;
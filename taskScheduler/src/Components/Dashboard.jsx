import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { Button, Card, Modal, Form, Table } from 'react-bootstrap';
import logoSchedule from '/Images/logo-schedule.png';
import './style.css'

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                navigate('/start');
            }).catch(err => console.log(err));
    };

    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    // Update current time and date every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
            setCurrentDate(now.toLocaleDateString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Fetch tasks from API or any data source
        axios.get('http://localhost:8081/tasks')
            .then(res => {
                setTasks(res.data);
            }).catch(err => console.log(err));
    }, []);

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar ${collapsed ? 'collapsed' : ''}`}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <img src={logoSchedule} alt="Logo" width="150" height="150" className="me-2" />
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            
                            <li>
                                <Link to="/employee" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-list-task"></i><span className="ms-1 d-none d-sm-inline">All Task</span> </Link>
                            </li>
                            <li>
                                <Link to="/employee" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-card-checklist"></i>  <span className="ms-1 d-none d-sm-inline">Completed Task</span> </Link>
                            </li>
                            <li>
                                <Link to="/employee" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-archive"></i><span className="ms-1 d-none d-sm-inline">Archive Task</span> </Link>
                            </li>
                            <li>
                                <Link to="profile" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
                            </li>
                            <hr />
                            <li onClick={handleLogout}>
                                <a href="#" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="main col p-2 m-0">
                    <div className='p-2 d-flex justify-content-between shadow'>
                        <button className="btn  d-md-none" onClick={handleToggleSidebar}>
                            <i className="fs-5 bi bi-list"></i>
                        </button>
                        <h4 className="text-center align-items-center">Student Task Scheduler</h4>
                        <Button onClick={handleShow}><i class="fs-5 bi-plus-circle"></i></Button>
                    </div>

                    <Outlet />
                    <div className='content p-4 shadow '>
                        <h1>{currentTime}</h1>
                        <p>{currentDate}</p>
                    </div>
                    <h5 className='p-3'>Tasks</h5>
                    <div className='p-4 shadow '>
                    <Form>
                            <Form.Group controlId="formFilter">
                                <Form.Label>Search</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter task name"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </Form.Group>
                        </Form>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map(task => (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td>{task.completed ? 'Completed' : 'Not Completed'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                
            </div>

            {/* Modal for adding a new task */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form for adding a new task */}
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" />
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="Content" />
                        </Form.Group>
                        <Form.Group controlId="formSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Subject code" />
                        </Form.Group>
                        <Form.Group controlId="formInstructor">
                            <Form.Label>Instructor</Form.Label>
                            <Form.Control type="text" placeholder="Instructor name" />
                        </Form.Group>
                         <Form.Group controlId="formDate">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="Date" />
                        </Form.Group>
                        {/* Add other form fields here (content, subject, instructor, date) */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}><i class="bi-x-circle"></i></Button>
                    <Button variant="primary" onClick={handleClose}>Save Task</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Dashboard;

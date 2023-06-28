import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useParams } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React, { useEffect,useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment';


function DetailTeacher() {
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";
    const [teacher, setTeacher] = useState([]);

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getbyid/${id}`)
                .then((res) => {
                    setTeacher(res.data);
                });

        } catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
    useEffect(() => {
        getAsync(id)
    }, [])

    return (
        <div className='detail-area'>
            <div className="title-area">
                <Paper>
                    <h4>Detail</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper>
                        <Tooltip title='Image' placement='left' arrow>
                            <div className="single-area">
                                <img className='img-fluid' src={`data:image;base64,${teacher.image}`} alt="" />
                            </div>
                        </Tooltip>
                        <Tooltip title='Full name' placement='left' arrow>
                            <div className="single-area">
                                <p>{teacher.fullName}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Email' placement='left' arrow>
                            <div className="single-area">
                                <p>{teacher.email}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Phone' placement='left' arrow>
                            <div className="single-area">
                                <p>{teacher.phone}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Address' placement='left' arrow>
                            <div className="single-area">
                                <p>{teacher.address}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Bio' placement='left' arrow>
                            <div className="single-area">
                                <p>{teacher.biography}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Linkedin' placement='left' arrow>
                            <div className="single-area">
                                <p>tyguhljghjk</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Facebook' placement='left' arrow>
                            <div className="single-area">
                                <p>tyguhljghjk</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Twitter' placement='left' arrow>
                            <div className="single-area">
                                <p>tyguhljghjk</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Created Date' placement='left' arrow>
                            <div className="single-area">
                                <p>{moment(teacher.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Updated Date' placement='left' arrow>
                            <div className="single-area">
                                <p>{moment(teacher.modifiedDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Go to list' arrow placement="bottom-start">
                            <NavLink to='/staff'>
                                <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                            </NavLink>
                        </Tooltip>
                        <Tooltip title='Go to list' arrow placement="bottom-start">
                            <NavLink to='/teachers'>
                                <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                            </NavLink>
                        </Tooltip>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default DetailTeacher
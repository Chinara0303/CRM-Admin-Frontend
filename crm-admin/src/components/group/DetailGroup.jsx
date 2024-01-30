import { faChalkboardTeacher, faChevronLeft, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useParams } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function DetailGroup() {
    const { id } = useParams();
   const baseUrl = "https://localhost:7069";
    const [group, setGroup] = useState([]);
    const [room, setRoom] = useState([]);
    const [education, setEducation] = useState([]);
    const [time, setTime] = useState([]);
    const [seans, setSeans] = useState([]);
    const [teachers, setTeachers] = useState([])

    const weekday = { 1: 'Weekdays', 2: 'Weekend' }

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/group/getbyid/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setGroup(res.data);
                    getRoomAsync(res.data.roomId);
                    getEducationAsync(res.data.educationId);
                    getTimeAsync(res.data.timeId);
                    setTeachers(res.data.teachersInfo)
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
    const getRoomAsync = async (roomId) => {
        try {
            await axios.get(`${baseUrl}/api/room/getbyid/${roomId}`)
                .then((res) => {
                    setRoom(res.data)
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
    const getEducationAsync = async (educationId) => {
        try {
            await axios.get(`${baseUrl}/api/education/getbyid/${educationId}`)
                .then((res) => {
                    setEducation(res.data)
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
    const getTimeAsync = async (timeId) => {
        try {
            await axios.get(`${baseUrl}/api/time/getbyid/${timeId}`)
                .then((res) => {
                    setTime(res.data)
                    getSeansAsync(res.data.seansId)
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
    const getSeansAsync = async (seansId) => {
        try {
            await axios.get(`${baseUrl}/api/seans/getbyid/${seansId}`)
                .then((res) => {
                    setSeans(res.data)
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
        <div className='detail-area area'>
            <div className="title-area">
                <Paper>
                    <h4>Detail</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper>
                        <Tooltip title='Teachers' placement='left' arrow>
                        <div className="images-area">
                            {
                                teachers.map(function (teacher, i) {
                                    return <div key={i} className="img-area">
                                        <img className='img-fluid' src={`data:image/;base64,${teacher.image}`} alt="" />
                                        <p>{teacher.fullName}</p>
                                    </div>
                                })
                            }
                        </div>
                        </Tooltip>
                        <Tooltip title='Name' placement='left' arrow>
                            <div className="single-area">
                                <p>{group.name}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Room' placement='left' arrow>
                            <div className="single-area">
                                <p>{room.name}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Education' placement='left' arrow>
                            <div className="single-area">
                                <p>{education.name}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Weekday' placement='left' arrow>
                            <div className="single-area">
                                <p>{weekday[group.weekday]}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Time' placement='left' arrow>
                            <div className="single-area">
                                <p>{seans.name} {time.interval}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Go to list' arrow placement="bottom-start">
                            <NavLink to='/groups'>
                                <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                            </NavLink>
                        </Tooltip>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default DetailGroup
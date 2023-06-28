import { faChevronLeft, faPlus, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios, { Axios } from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import Swal from 'sweetalert2'

function AddGroup() {
    const baseUrl = "https://localhost:7069";
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [educations, setEducations] = useState([]);
    const [time, setTime] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [timeId, setTimeId] = useState(0);
    const [educationId, setEducationId] = useState(0);
    const [weekday, setWeekday] = useState(0);

    const seanses = { 1: 'Weekdays', 2: 'Weekend' };

    const newGroup = { roomId: roomId, educationId: educationId, weekday: weekday, timeI: timeId };

    const getRoomsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/room/getall`)
                .then((res) => {
                    setRooms(res.data)
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
    const getEducationsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/education/getall`)
                .then((res) => {
                    setEducations(res.data)
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
    const getTimeAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/time/getall`)
                .then((res) => {
                    setTime(res.data)
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newGroup)) {
            formData.append(key, value);
        };

        try {
            await axios.post(`${baseUrl}/api/group/create`, formData, {
                headers: {
                    Accept: "*/*"
                }
            })
                .then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Added a new item',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                })
                .then(() => {
                    navigate("/groups")
                })
        }
        catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    };

    const handleEducationChange = (e) => {
        setEducationId(e.target.value);
    };

    const handleRoomChange = (e) => {
        setRoomId(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTimeId(e.target.value);
    };

    const handleWeekdayChange = (e) => {
        setWeekday(e.target.value);
    };

    useEffect(() => {
        getEducationsAsync();
        getTimeAsync();
        getRoomsAsync();
    }, [])

    return (
        <div className='create-area area mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Create</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        <Form>
                            <FormGroup >
                                <InputGroup>
                                    <InputGroupText>Education</InputGroupText>
                                    <Input type="select" name='select' onChange={(e) => handleEducationChange(e)} >
                                        {
                                            educations.map(function (education, i) {
                                                return <option value={education.id} key={i}>{education.name}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Room</InputGroupText>
                                    <Input type="select" name='select' onChange={(e) => handleRoomChange(e)} >
                                        {
                                            rooms.map(function (room, i) {
                                                return <option value={room.id} key={i}>{room.name}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup >
                                <InputGroup>
                                    <InputGroupText>Time</InputGroupText>
                                    <Input type="select" name='select' onChange={(e) => handleTimeChange(e)} >
                                        {
                                            time.map(function (item, i) {
                                                return <option value={item.id} key={i}>{item.interval}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            
                            <FormGroup >
                                <InputGroup>
                                    <InputGroupText>WeekDay</InputGroupText>
                                    {/* <Input type="select" name='select' onChange={(e) => handleWeekdayChange(e)} >
                                        {
                                            weekday.map(function (item, i) {
                                                return <option value={item.id} key={i}>{item.name}</option>
                                            })
                                        }
                                    </Input> */}
                                    
                                </InputGroup>
                            </FormGroup>

                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/groups'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='add' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'><FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#0ae60d", }} /></Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default AddGroup
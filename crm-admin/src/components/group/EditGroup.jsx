import { useTheme } from '@emotion/react'
import { faChevronLeft, faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import Swal from 'sweetalert2'

function EditGroup() {

    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";



    const [rooms, setRooms] = useState([]);
    const [group, setGroup] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacherInfos, setTeacherInfos] = useState([]);
    const [roomId, setRoomId] = useState([]);
    const [teacherIds, setTeacherIds] = useState([]);
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState([]);


    const newGroup = { roomId: roomId, teacherIds: teacherIds };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/group/getbyid/${id}`)
                .then((res) => {
                    setGroup(res.data);
                    setRoomId(res.data.roomId);
                    setTeacherInfos(res.data.teachersInfo)
                });

        } catch (error) {
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
    const getTeachersAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getall?skip=0&take=0`)
                .then((res) => {
                    if (res.data.datas.length > 0) {
                        setTeachers(res.data.datas);
                    }

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

    const getRoomsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/room/getall`).then((res) => {
                if (res.data.length > 0) {
                    setRooms(res.data)
                }
            })
        }
        catch (error) {
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newGroup)) {
            if (key === 'teacherIds') {
                value.forEach((val, index) => {
                    formData.append(`teacherIds[${index}]`, val)
                })
                continue;
            }
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/group/update/${id}`, formData, {
                headers: {
                    Accept: "*/*"
                }
            }).then(() => {
                navigate("/groups")
            })
        }
        catch (error) {
            const errors = error.response.data;
            if (errors.length > 0) {
                setInvalid(true)
                setInvalidMessage(errors)
            }
        }
    };

    const handleRoomChange = (e) => {
        setRoomId(e.target.value);
        setInvalid(false)
    };

    const handleTeacherChange = (e) => {
        setTeacherIds(e.target.value);
        setInvalid(false)
    }

    const handleRemoveTeacher = async (teacherId) => {
        try {
            await axios.delete(`${baseUrl}/api/group/deleteTeacher/${teacherId}`)
            getAsync(id)
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }

    useEffect(() => {
        getAsync(id);
        getRoomsAsync();
        getTeachersAsync();
    }, [])

    return (
        <div className='edit-area area mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        <div className="images-area">
                            {
                                teacherInfos.map(function (teacher, i) {
                                    return <div key={i} className="img-area">
                                        <img className='img-fluid' src={`data:image/;base64,${teacher.image}`} alt="" />
                                        <div className='remove-area'>
                                            <button type="button" onClick={() => handleRemoveTeacher(teacher.teacherId)}>
                                                <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#db0000", }} />
                                            </button>
                                        </div>
                                        <p>{teacher.fullName}</p>
                                    </div>
                                })
                            }
                        </div>

                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup style={{ marginBottom: "20px" }}>
                                {
                                    invalid && (
                                        <Alert severity="error">{invalidMessage}</Alert>
                                    )
                                }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Room</InputGroupText>
                                    <Input type="select" name='select' value={roomId} onChange={(e) => handleRoomChange(e)} >
                                        {
                                            rooms.map(function (room, i) {
                                                return <option value={room.id} key={i}>{room.name}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className='mb-5'>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-chip-label">Teacher</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={teacherIds}
                                        onChange={handleTeacherChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    >
                                        {teachers.map((teacher, i) => (
                                            <MenuItem
                                                key={i}
                                                value={teacher.id}
                                            // style={getStyles(teacher.fullName, personName, theme)}
                                            >
                                                {teacher.fullName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            {/* <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Teachers</InputGroupText>
                                    <Input type="select" name='select' multiple onChange={(e) => handleTeacherChange(e)} >
                                        <option value="">Choose</option>
                                        {
                                            teachers.map(function (teacher, i) {
                                                return <option value={teacher.id} key={i}>{teacher.fullName}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup> */}

                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/groups'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='Add' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'><FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} /></Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default EditGroup
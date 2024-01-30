import React, { useState } from 'react'
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Chip, Container, Grid, InputLabel, Paper, Select, Tooltip, useTheme, MenuItem, OutlinedInput, FormControl, FormLabel, Autocomplete, Alert } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'


function AddTeacherToGroup() {
   const baseUrl = "https://localhost:7069";
    const token = JSON.parse(localStorage.getItem('user-info'));

    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState([]);
    const navigate = useNavigate();
    const [groupId, setGroupId] = useState(0);
    const [teacherIds, setTeacherIds] = useState([]);
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const newTeacherGroup = { groupId: groupId, teacherIds: teacherIds };

    const getGroupsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/group/getall?skip=0&take=0`)
                .then((res) => {
                    if (res.data.datas.length > 0) {
                        setGroups(res.data.datas)
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

    const getTeachersAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getall?skip=0&take=0`)
                .then((res) => {
                    if (res.data.datas.length > 0) {
                        setTeachers(res.data.datas)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(newTeacherGroup)) {
            if (key === 'teacherIds') {
                value.forEach((val, index) => {
                    formData.append(`teacherIds[${index}]`, val)
                })
                continue;
            }
            formData.append(key, value);
        };


        try {
            await axios.post(`${baseUrl}/api/teachergroup/create`, formData, 
            { headers: { "Authorization": `Bearer ${token}` } })
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
                    navigate("/groupTeacher")
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

    useEffect(() => {
        getGroupsAsync();
        getTeachersAsync();
    }, [])

    const handleGroupChange = (e) => {
        setGroupId(e.target.value)
    }

    const handleTeacherChange = (e) => {
        setTeacherIds(e.target.value);
    }

    return (
        <div className='create-area  mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Create</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup style={{ marginBottom: "20px" }}>
                                {
                                    invalid && (
                                        <Alert severity="error">{invalidMessage}</Alert>
                                    )
                                }
                            </FormGroup>
                            <div className="forms mt-3">
                                <FormGroup className='w-100'>
                                    <InputLabel style={{ marginTop: "20px" }} id="demo-simple-select-standard-label">Select the group</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standart-label"
                                        id="demo-simple-select-filled"
                                        fullWidth
                                        value={groupId}
                                        name="groupId"
                                        autoComplete="off"
                                        onChange={(e) => handleGroupChange(e)}>
                                        {
                                            groups.map(function (group, i) {
                                                return <MenuItem value={group.id} key={i}>{group.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormGroup>
                                <FormGroup >
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
                                                >
                                                    {teacher.fullName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/groupteacher'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='add' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'>
                                    <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#0ae60d", }} />
                                </Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default AddTeacherToGroup
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip, OutlinedInput, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditStaff() {
    const navigate = useNavigate();
    const { id } = useParams();


    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const token = JSON.parse(localStorage.getItem('user-info'));

    const [roleIds, setRoleIds] = useState([]);
    const [roles, setRoles] = useState([]);
    const [roleNames, setRoleNames] = useState([]);
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState([]);

    const newEmployee = { roleIds: roleIds };

    const getRolesAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/account/getroles?skip=0&take=0`)
                .then((res) => {
                    if (res.data.datas.length > 0) {
                        setRoles(res.data.datas)
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
    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/account/getuserbyid/${id}`)
                .then((res) => {
                    setRoleNames(res.data.roleNames);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(newEmployee)) {
            if (key === 'roleIds') {
                value.forEach((val, index) => {
                    formData.append(`roleIds[${index}]`, val)
                })
                continue;
            }
            formData.append(key, value);
        };
        try {
            await axios.put(`${baseUrl}/api/account/userroleupdate/${id}`, formData)
                .then(() => {
                    navigate("/staff")
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

    const handleRemoveRole = async (roleName) => {
        try {
            await axios.delete(`${baseUrl}/api/account/deleterole/${id}?roleName=${roleName}`,)
                .then(() => {
                    getAsync(id)

                })
        }
        catch (error) {
            const errors = error.response.data;
            if (errors.length > 0) {
                setInvalid(true)
                setInvalidMessage(errors)
            }
        }
    }

    const handleRoleChange = (e) => {
        setRoleIds(e.target.value);
        setInvalid(false)
    }

    useEffect(() => {
        getAsync(id)
        getRolesAsync();
    }, []);


    return (
        <div className='edit-area area'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper>
                        <FormGroup style={{ marginBottom: "20px" }}>
                            {
                                invalid && (
                                    <Alert severity="error">{invalidMessage}</Alert>
                                )
                            }
                        </FormGroup>
                        {
                            roleNames.map(function (roleName, i) {
                                return <span className='role-name' onClick={() => handleRemoveRole(roleName)} key={i} >{roleName}</span>
                            })
                        }
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup>
                                <FormControl sx={{ m: 1, width: 300 }} >
                                    <InputLabel id="demo-multiple-chip-label">Teacher</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={roleIds}
                                        name="roleIds"
                                        onChange={handleRoleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    >
                                        {roles.map((role, i) => (
                                            <MenuItem
                                                key={i}
                                                value={role.id}
                                            >
                                                {role.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/staff'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Button type='submit' style={{ border: "none" }} color='transparent'>
                                <Tooltip title='Update' arrow placement="bottom-start">
                                    <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} />
                                </Tooltip>
                            </Button>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default EditStaff
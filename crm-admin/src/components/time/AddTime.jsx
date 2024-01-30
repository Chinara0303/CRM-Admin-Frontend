import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function AddTime() {
   const baseUrl = "https://localhost:7069";
    const token = JSON.parse(localStorage.getItem('user-info'));

    const navigate = useNavigate();

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [seansId, setSeansId] = useState(0);
    const [seanses, setSeanses] = useState([]);
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState([]);
    const newTime = { start: start, end: end, seansId: seansId };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(newTime)) {
            formData.append(key, value);
        };
        try {
            await axios.post(`${baseUrl}/api/time/create`, formData,
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
                    navigate("/time")
                })
        } catch (error) {
            const errors = error.response.data;
            if (errors.length > 0) {
                setInvalid(true)
                setInvalidMessage(errors)
            }
        }
    };
    const getSeansesAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/seans/getall`)
                .then((res) => {
                    setSeanses(res.data)
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
    const handleStartTimeChange = (e) => {
        setStart(e.target.value)
    };
    const handleEndTimeChange = (e) => {
        setEnd(e.target.value)
    };
    const handlSeansIdChange = (e) => {
        setSeansId(e.target.value)
    };
    useEffect(() => {
        getSeansesAsync()
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
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup >
                            <FormGroup style={{ marginBottom: "20px" }}>
                                {
                                    invalid && (
                                        <Alert severity="error">{invalidMessage}</Alert>
                                    )
                                }
                            </FormGroup>
                                <div className="d-flex justify-content-between  ">
                                    <InputGroup className='me-2'>
                                        <InputGroupText>Start</InputGroupText>
                                        <Input type='time' onChange={(e) => handleStartTimeChange(e)} />
                                    </InputGroup>

                                    <InputGroup>
                                        <InputGroupText>End</InputGroupText>
                                        <Input type='time' onChange={(e) => handleEndTimeChange(e)} />
                                    </InputGroup>
                                </div>

                            </FormGroup>
                            <FormGroup >
                                <InputGroup>
                                    <InputGroupText>Seans</InputGroupText>
                                    <Input type="select" name='select' onChange={(e) => handlSeansIdChange(e)} >
                                        {
                                            seanses.map(function (seans, i) {
                                                return <option value={seans.id} key={i}>{seans.name}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/time'>
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
        </div >
    )
}

export default AddTime
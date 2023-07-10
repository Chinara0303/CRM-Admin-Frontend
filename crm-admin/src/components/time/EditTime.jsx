import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditTime() {
    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";


    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [seansId, setSeansId] = useState(0);
    const [seanses, setSeanses] = useState([]);
    const newTime = { start: start, end: end, seansId: seansId };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/time/getbyid/${id}`)
                .then((res) => {
                    setStart(res.data.start);
                    setEnd(res.data.end);
                    setSeansId(res.data.seansId);
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

        for (const [key, value] of Object.entries(newTime)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/time/update/${id}`, formData, {
                headers: {
                    Accept: "*/*"
                }
            }).then(() => {
                navigate("/time")
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

    const getSeansesAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/seans/getall`).then((res) => {
                if (res.data.length > 0) {
                    setSeanses(res.data)
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

    useEffect(() => {
        getAsync(id);
        getSeansesAsync();
    }, [])

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
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup >
                                <div className="d-flex justify-content-between ">
                                    <InputGroup className='me-2'>
                                        <InputGroupText>Start</InputGroupText>
                                        <Input type='time' name={start} value={start} onChange={(e) => setStart(e.target.value)} />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupText>End</InputGroupText>
                                        <Input type='time' name={end} value={end} onChange={(e) => setEnd(e.target.value)} />
                                    </InputGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                            <InputGroup>
                                <InputGroupText>Seans</InputGroupText>
                                <Input type="select" name='select' value={seansId} onChange={(e) => setSeansId(e.target.value)} >
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
                        <Button type='submit' style={{ border: "none" }} color='transparent'>
                            <Tooltip title='Update' arrow placement="bottom-start">
                                <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} />
                            </Tooltip>
                        </Button>

                    </Form>
                </Paper>
            </Grid>
        </Container>
        </div >
    )
}

export default EditTime
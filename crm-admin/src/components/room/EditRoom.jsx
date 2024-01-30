import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditRoom() {
    const navigate = useNavigate();
    const { id } = useParams();
   const baseUrl = "https://localhost:7069";
    const [room, setRoom] = useState([]);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidCapacity, setInvalidCapacity] = useState(false);
    const [invalidCapacityMessage, setInvalidCapacityMessage] = useState("");
    const [invalidNameMessage, setInvalidNameMessage] = useState("");
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const newRoom = { name: name, capacity: capacity };


    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/room/getbyid/${id}`)
                .then((res) => {
                    setRoom(res.data);
                    setName(res.data.name);
                    setCapacity(res.data.capacity);
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

        for (const [key, value] of Object.entries(newRoom)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/room/update/${id}`, formData).then(() => {
                navigate("/rooms")
            })
        }
        catch (error) {
            const errors = error.response.data.errors;
            if(errors.Capacity != undefined){
                if (errors.Capacity.length > 0) {
                    setInvalidCapacity(true);
                    setInvalidCapacityMessage(errors.Capacity)
                }
            }
            if(errors.Name != undefined){
                if (errors.Name.length > 0) {
                    setInvalidName(true);
                    setInvalidNameMessage(errors.Name)
                }
            }
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setInvalidName(false)
    }
    const handleCapacityChange = (e) => {
        setCapacity(e.target.value);
        setInvalidCapacity(false)
    }
    useEffect(() => {
        getAsync(id)
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
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Name</InputGroupText>
                                    <Input type='text' invalid={invalidName} name={name} value={name} onChange={handleNameChange} />
                                    {
                                        invalidName && (
                                            <FormFeedback invalid>
                                                {invalidNameMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Capacity</InputGroupText>
                                    <Input type='number' invalid={invalidCapacity} name={capacity} value={capacity} onChange={handleCapacityChange} />
                                    {
                                        invalidCapacity && (
                                            <FormFeedback invalid>
                                                {invalidCapacityMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/rooms'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='add' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'><FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} /></Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default EditRoom
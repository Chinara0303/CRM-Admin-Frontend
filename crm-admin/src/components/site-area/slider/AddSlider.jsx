import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, IconButton, Paper, Snackbar, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import Swal from 'sweetalert2'

function AddSlider() {
    const baseUrl = "https://localhost:7069";
    const navigate = useNavigate();


    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(" ");
    const [description, setDescription] = useState("");

    const newSlider = { photo: file, title: title, description: description };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newSlider)) {
            formData.append(key, value);
        };
        try {
            await axios.post(`${baseUrl}/api/slider/create`, formData, {
                headers: {
                    Accept: "*/*"
                }
            })
                .then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Added a new slider',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                })
                .then(() => {
                    navigate("/site/sliders")
                })
        } catch (error) {
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            console.log(error);

        }

    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className='create-area mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Create</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup>
                                <Input type='file' id='file' onChange={handleFileChange} />
                                <Label className='btn-2' for='file' >Upload</Label>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Title</InputGroupText>
                                    <Input type='text' id="text" name="title" onChange={(e) => handleTitleChange(e)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Description</InputGroupText>
                                    <Input type='textarea' name="description" onChange={(e) => handleDescChange(e)} />
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/site/sliders'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>

                            <Button type='submit' style={{ border: "none" }} color="transparent">
                                <Tooltip title='Add' arrow placement="bottom-start">
                                    <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#0ae60d", }} />
                                </Tooltip>
                            </Button>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default AddSlider
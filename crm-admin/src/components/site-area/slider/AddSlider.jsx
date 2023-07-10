import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function AddSlider() {
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const navigate = useNavigate();

    const [invalidTitle, setInvalidTitle] = useState(false);
    const [invalidFile, setInvalidFile] = useState(false);
    const [invalidDescription, setInvalidDescription] = useState(false);
    const [invalidDescriptionMessage, setInvalidDescriptionMessage] = useState("");
    const [invalidTitleMessage, setInvalidTitleMessage] = useState("");
    const [invalidFileMessage, setInvalidFileMessage] = useState("");

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
            const errors = error.response.data.errors;
            if (errors.Title != undefined) {
                if (errors.Title.length > 0) {
                    setInvalidTitle(true);
                    setInvalidTitleMessage(errors.Title)
                }
            }
            if (errors.Description != undefined) {
                if (errors.Description.length > 0) {
                    setInvalidDescription(true);
                    setInvalidDescriptionMessage(errors.Description)
                }
            }
            if (errors.Photo != undefined) {
                if (errors.Photo.length > 0) {
                    setInvalidFile(true);
                    setInvalidFileMessage(errors.Photo)
                }
            }
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setInvalidTitle(false)
    }
    const handleDescChange = (e) => {
        setDescription(e.target.value);
        setInvalidDescription(false)
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setInvalidFile(false)
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
                                <Input type='file' id='file' invalid={invalidFile} onChange={handleFileChange} />
                                <Label className='btn-2' for='file' >Upload</Label>
                                {
                                    invalidFile && (
                                        <FormFeedback invalid>
                                            {invalidFileMessage}
                                        </FormFeedback>
                                    )
                                }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Title</InputGroupText>
                                    <Input type='text' id="text" invalid={invalidTitle} name="title" onChange={(e) => handleTitleChange(e)} />
                                    {
                                        invalidTitle && (
                                            <FormFeedback invalid>
                                                {invalidTitleMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Description</InputGroupText>
                                    <Input type='textarea' invalid={invalidDescription} name="description" onChange={(e) => handleDescChange(e)} />
                                    {
                                        invalidDescription && (
                                            <FormFeedback invalid>
                                                {invalidDescriptionMessage}
                                            </FormFeedback>
                                        )
                                    }
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
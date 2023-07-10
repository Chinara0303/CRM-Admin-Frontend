import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function AddAbout() {
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [description, setDescription] = useState("");

    const newAbout = { photo: file, title: title, subTitle:subTitle, description: description };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newAbout)) {
            formData.append(key, value);
        };
        try {
            await axios.post(`${baseUrl}/api/about/create`, formData, {
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
                    navigate("/site/about")
                })
        } catch (error) {
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }
    const handleSubTitleChange = (e) => {
        setSubTitle(e.target.value);
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
                                <Input type='file' id='file'  onChange={handleFileChange}/>
                                <Label className='btn-2' for='file'>Upload</Label>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Title</InputGroupText>
                                    <Input type='text' name="title" onChange={(e) => handleTitleChange(e)}  />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Subtitle</InputGroupText>
                                    <Input type='text' name="subTitle" onChange={(e) => handleSubTitleChange(e)}  />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Description</InputGroupText>
                                    <Input type='textarea' name="description" onChange={(e) => handleDescChange(e)}  />
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/site/about'>
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

export default AddAbout
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditEducation() {
    const baseUrl = "https://localhost:7069";
    const navigate = useNavigate();
    const { id } = useParams();

    const [invalidName, setInvalidName] = useState(false);
    const [invalidPrice, setInvalidPrice] = useState(false);
    const [invalidDuration, setInvalidDuration] = useState(false);
    const [invalidPromise, setInvalidPromise] = useState(false);
    const [invalidDescription, setInvalidDescription] = useState(false);
    const [invalidDescriptionMessage, setInvalidDescriptionMessage] = useState("");
    const [invalidPromiseMessage, setInvalidPromiseMessage] = useState("");
    const [invalidDurationMessage, setinvalIdDurationMessage] = useState("");
    const [invalidPriceMessage, setInvalidPriceMessage] = useState("");
    const [invalidNameMessage, setInvalidNameMessage] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [promise, setPromise] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState();
    const [education, setEducation] = useState();

    const newEducation = { name: name, price: price, description: description, promise: promise, duration: duration, photo: file };


    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/education/getbyid/${id}`)
                .then((res) => {
                    setEducation(res.data);
                    setName(res.data.name);
                    setDescription(res.data.description);
                    setDuration(res.data.duration);
                    setPromise(res.data.promise);
                    setPrice(res.data.price);
                    setImage(res.data.image);
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

        for (const [key, value] of Object.entries(newEducation)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/education/update/${id}`, formData).then(() => {
                navigate("/educations")
            })
        }
        catch (error) {
            const errors = error.response.data.errors;
            if (errors.Name != undefined) {
                if (errors.Name.length > 0) {
                    setInvalidName(true);
                    setInvalidNameMessage(errors.Name)
                }
            }
            if (errors.Price != undefined) {
                if (errors.Price.length > 0) {
                    setInvalidPrice(true);
                    setInvalidPriceMessage(errors.Price)
                }
            }
            if (errors.Description != undefined) {
                if (errors.Description.length > 0) {
                    setInvalidDescription(true);
                    setInvalidDescriptionMessage(errors.Description)
                }
            }
            if (errors.Duration != undefined) {
                if (errors.Duration.length > 0) {
                    setInvalidDuration(true);
                    setinvalIdDurationMessage(errors.Duration)
                }
            }
            if (errors.Promise != undefined) {
                if (errors.Promise.length > 0) {
                    setInvalidPromise(true);
                    setInvalidPromiseMessage(errors.Promise)
                }
            }
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setInvalidName(false);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        setInvalidPrice(false);
    };
    const handleDurationChange = (e) => {
        setDuration(e.target.value);
        setInvalidDuration(false);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setInvalidDescription(false)
    };
    const handlePromiseChange = (e) => {
        setPromise(e.target.value);
        setInvalidPromise(false)
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        getAsync(id)

    }, [])

    return (
        <div className='edit-area'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper >   {
                        image != null ?
                            <div className="image-area">
                                <img src={`data:image;base64,${image}`} />
                            </div>
                            : null
                    }
                        <Form className='mt-5' onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup>
                                <Input type='file' id='file' onChange={handleFileChange} />
                                <Label className='btn-2' for='file'>Upload</Label>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Name</InputGroupText>
                                    <Input type='text' invalid={invalidName} value={name} name={name} onChange={handleNameChange} />
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
                                    <InputGroupText>Description</InputGroupText>
                                    <Input type='textarea' invalid={invalidDescription} value={description} name={description} onChange={handleDescriptionChange} />
                                    {
                                        invalidDescription && (
                                            <FormFeedback invalid>
                                                {invalidDescriptionMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Price</InputGroupText>
                                    <Input invalid={invalidPrice} value={price} name={price} onChange={handlePriceChange} />
                                    {
                                        invalidPrice && (
                                            <FormFeedback invalid>
                                                {invalidPriceMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Duration</InputGroupText>
                                    <Input type="text" invalid={invalidDuration} value={duration} name={duration} onChange={handleDurationChange} />
                                    {
                                        invalidDuration && (
                                            <FormFeedback invalid>
                                                {invalidDurationMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Promises</InputGroupText>
                                    <Input type="textarea" invalid={invalidPromise} value={promise} name={promise} onChange={handlePromiseChange} />
                                    {
                                        invalidPromise && (
                                            <FormFeedback invalid>
                                                {invalidPromiseMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/educations'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='Update' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'>
                                    <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} />
                                </Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default EditEducation
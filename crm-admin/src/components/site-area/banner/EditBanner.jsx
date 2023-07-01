import { faChevronLeft, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'
function EditBanner() {
    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";

    const [invalidTitle, setInvalidTitle] = useState(false);
    const [invalidFile, setInvalidFile] = useState(false);
    const [invalidOffer, setInvalidOffer] = useState(false);
    const [invalidDescription, setInvalidDescription] = useState(false);
    const [invalidDescriptionMessage, setInvalidDescriptionMessage] = useState("");
    const [invalidTitleMessage, setInvalidTitleMessage] = useState("");
    const [invalidFileMessage, setInvalidFileMessage] = useState("");
    const [invalidOfferMessage, setInvalidOfferMessage] = useState("");

    const [banner, setBanner] = useState();
    const [image, setImage] = useState();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [offer, setOffer] = useState("");
    const [description, setDescription] = useState("");

    const newBanner = { photo: file, title: title, offer: offer, description: description };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/banner/getbyid/${id}`)
                .then((res) => {
                    setBanner(res.data);
                    setImage(res.data.image);
                    setTitle(res.data.title);
                    setOffer(res.data.offer);
                    setDescription(res.data.description);
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

        for (const [key, value] of Object.entries(newBanner)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/banner/update/${id}`, formData, {
                headers: {
                    Accept: "*/*"
                }
            }).then(() => {
                navigate("/site/banners")
            })
        }
        catch (error) {
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
            if (errors.Offer != undefined) {
                if (errors.Offer.length > 0) {
                    setInvalidOffer(true);
                    setInvalidOfferMessage(errors.Offer)
                }
            }

        }
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setInvalidTitle(false)
    };
    const handleDescChange = (e) => {
        setDescription(e.target.value);
        setInvalidDescription(false)
    }
    const handleOfferChange = (e) => {
        setOffer(e.target.value);
        setInvalidOffer(false)
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setInvalidFile(false)
    };
    useEffect(() => {
        getAsync(id)
    }, [])
    return (
        <div className='edit-area mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        {
                            image != null ?
                                <div className="image-area">
                                    <img src={`data:image;base64,${image}`} />
                                </div>
                                : null
                        }
                        <Form className='mt-5' onSubmit={handleSubmit}>
                            <FormGroup>
                                <Input type='file' id='file' invalid={invalidFile} name={file} onChange={(e) => handleFileChange(e)} />
                                <Label className='btn-2' for='file'>Upload</Label>
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
                                    <Input type='text' invalid={invalidFile} name={title} value={title} onChange={(e) => handleTitleChange(e)} />
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
                                    <Input type='textarea' invalid={invalidDescription} value={description} name={description} onChange={(e) => handleDescChange(e)} />
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
                                    <InputGroupText>Offer</InputGroupText>
                                    <Input type='textarea' invalid={invalidOffer} value={offer} name={offer} onChange={(e) => handleOfferChange(e)} />
                                    {
                                        invalidOffer && (
                                            <FormFeedback invalid>
                                                {invalidOfferMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/site/banners'>
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

export default EditBanner
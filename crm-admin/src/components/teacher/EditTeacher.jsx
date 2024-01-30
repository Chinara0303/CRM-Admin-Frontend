import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditTeacher() {
    const navigate = useNavigate();
    const { id } = useParams();
   const baseUrl = "https://localhost:7069";

    const [invalidFullName, setInvalidFullName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidAge, setInvalidAge] = useState(false);
    const [invalidAddress, setInvalidAddress] = useState(false);
    const [invalidBiography, setInvalidBiography] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState([]);
    const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
    const [invalidFullNameMessage, setInvalidFullNameMessage] = useState("");
    const [invalidPhoneMessage, setInvalidPhoneMessage] = useState("");
    const [invalidAgeMessage, setInvalidAgeMessage] = useState("");
    const [invalidAddressMessage, setInvalidAddressMessage] = useState("");
    const [invalidBiographyMessage, setInvalidBiographyMessage] = useState("");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [biography, setBiography] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState();
    const [teacher, setTeacher] = useState([]);
    const newTeacher = { fullName: fullName, email: email, phone: phone, address: address, age: age, biography: biography, photo: file };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getbyid/${id}`)
                .then((res) => {
                    setTeacher(res.data);
                    setFullName(res.data.fullName);
                    setAddress(res.data.address);
                    setPhone(res.data.phone);
                    setAge(res.data.age);
                    setBiography(res.data.biography);
                    setEmail(res.data.email);
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

        for (const [key, value] of Object.entries(newTeacher)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/teacher/update/${id}`, formData).then(() => {
                navigate("/teachers")
            })
        }
        catch (error) {
            const errors = error.response.data;
            if (errors.length > 0) {
                setInvalid(true)
                setInvalidMessage(errors)
            }
            if (errors.errors !== undefined) {
                if (errors.errors.FullName !== undefined) {
                    if (errors.errors.FullName.length > 0) {
                        setInvalidFullName(true);
                        setInvalidFullNameMessage(errors.errors.FullName)
                    }
                }
                if (errors.errors.Email !== undefined) {
                    debugger
                    if (errors.errors.Email.length > 0) {
                        setInvalidEmail(true);
                        setInvalidEmailMessage(errors.errors.Email)
                    }
                }
                if (errors.errors.Phone !== undefined) {
                    if (errors.errors.Phone.length > 0) {
                        setInvalidPhone(true);
                        setInvalidPhoneMessage(errors.errors.Phone)
                    }
                }
                if (errors.errors.Age !== undefined) {
                    if (errors.errors.Age.length > 0) {
                        setInvalidAge(true);
                        setInvalidAgeMessage(errors.errors.Age)
                    }
                }
                if (errors.errors.Address !== undefined) {
                    if (errors.errors.Address.length > 0) {
                        setInvalidAddress(true);
                        setInvalidAddressMessage(errors.errors.Address)
                    }
                }
                if (errors.errors.Biography !== undefined) {
                    if (errors.errors.Biography.length > 0) {
                        setInvalidBiography(true);
                        setInvalidBiographyMessage(errors.errors.Biography)
                    }
                }
            }
        }
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        setInvalidFullName(false)
        setInvalid(false)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setInvalidEmail(false);
        setInvalid(false)
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setInvalidAddress(false)
        setInvalid(false)
    };
    const handleAgeChange = (e) => {
        setAge(e.target.value);
        setInvalidAge(false)
        setInvalid(false)
    };
    const handleBiographyChange = (e) => {
        setBiography(e.target.value);
        setInvalidBiography(false);
        setInvalid(false)
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setInvalidPhone(false)
        setInvalid(false)
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
                    <Paper>
                        {
                            image != null ?
                                <div className="image-area">
                                    <img src={`data:image;base64,${image}`} />
                                </div>
                                : null
                        }
                        <Form className='mt-5' onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup>
                                <InputGroup>
                                    <Input type='file' id='file' onChange={handleFileChange} />
                                    <Label className='btn-2' for='file' >Upload</Label>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Full name</InputGroupText>
                                    <Input type='text' invalid={invalidFullName} value={fullName} name={fullName} onChange={handleFullNameChange} />
                                    {
                                        invalidFullName && (
                                            <FormFeedback invalid>
                                                {invalidFullNameMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Email</InputGroupText>
                                    <Input invalid={invalidEmail} value={email} name={email} onChange={handleEmailChange} />
                                    {
                                        invalidEmail && (
                                            <FormFeedback invalid>
                                                {invalidEmailMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Phone</InputGroupText>
                                    <Input type='text' invalid={invalidPhone} value={phone} name={phone} onChange={handlePhoneChange} />
                                    {
                                        invalidPhone && (
                                            <FormFeedback invalid>
                                                {invalidPhoneMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Age</InputGroupText>
                                    <Input type='number' invalid={invalidAge} value={age} name={age} onChange={handleAgeChange} />
                                    {
                                        invalidAge && (
                                            <FormFeedback invalid>
                                                {invalidAgeMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Addres</InputGroupText>
                                    <Input type='text' invalid={invalidAddress} value={address} name={address} onChange={handleAddressChange} />
                                    {
                                        invalidAddress && (
                                            <FormFeedback invalid>
                                                {invalidAddressMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Biography</InputGroupText>
                                    <Input type='textarea' invalid={invalidBiography} value={biography} name={biography} onChange={handleBiographyChange} />
                                    {
                                        invalidBiography && (
                                            <FormFeedback invalid>
                                                {invalidBiographyMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/teachers'>
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

export default EditTeacher
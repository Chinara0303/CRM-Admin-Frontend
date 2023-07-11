import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function AddTeacher() {
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('user-info'));

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

    const newTeacher = { fullName: fullName, email: email, phone: phone, address: address, age: age, biography: biography, photo: file };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newTeacher)) {
            formData.append(key, value);
        };

        try {
            await axios.post(`${baseUrl}/api/teacher/create`, formData, 
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
                    navigate("/teachers")
                })

        }
        catch (error) {
            const errors = error.response.data;
            if (errors.length > 0) {
                setInvalid(true)
                setInvalidMessage(errors)
            }
            if (errors.errors != undefined) {
                if (errors.errors.FullName != undefined) {
                    if (errors.errors.FullName.length > 0) {
                        setInvalidFullName(true);
                        setInvalidFullNameMessage(errors.errors.FullName)
                    }
                }
                if (errors.errors.Email != undefined) {
                    if (errors.errors.Email.length > 0) {
                        setInvalidEmail(true);
                        setInvalidEmailMessage(errors.errors.Email)
                    }
                }
                if (errors.errors.Phone != undefined) {
                    if (errors.errors.Phone.length > 0) {
                        setInvalidPhone(true);
                        setInvalidPhoneMessage(errors.errors.Phone)
                    }
                }
                if (errors.errors.Age != undefined) {
                    if (errors.errors.Age.length > 0) {
                        setInvalidAge(true);
                        setInvalidAgeMessage(errors.errors.Age)
                    }
                }
                if (errors.errors.Address != undefined) {
                    if (errors.errors.Address.length > 0) {
                        setInvalidAddress(true);
                        setInvalidAddressMessage(errors.errors.Address)
                    }
                }
                if (errors.errors.Biography != undefined) {
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
        setInvalidFullName(false);
        setInvalid(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setInvalidEmail(false);
        setInvalid(false);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setInvalidAddress(false)
        setInvalid(false);
    };
    const handleAgeChange = (e) => {
        setAge(e.target.value);
        setInvalidAge(false)
        setInvalid(false);
    };
    const handleBiographyChange = (e) => {
        setBiography(e.target.value);
        setInvalidBiography(false);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setInvalidPhone(false)
        setInvalid(false);
    };
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
                            <FormGroup style={{ marginBottom: "20px" }}>
                                {
                                    invalid && (
                                        <Alert severity="error">{invalidMessage}</Alert>
                                    )
                                }
                            </FormGroup>
                            <FormGroup>
                                <Input type='file' id='file' onChange={handleFileChange} />
                                <Label className='btn-2' for='file'>Upload</Label>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Full name</InputGroupText>
                                    <Input type='text' invalid={invalidFullName} name="fullName" onChange={(e) => handleFullNameChange(e)} />
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
                                    <Input invalid={invalidEmail} name="email" onChange={(e) => handleEmailChange(e)} />
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
                                    <Input invalid={invalidPhone} name="phone" onChange={(e) => handlePhoneChange(e)} />
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
                                    <Input type='number' invalid={invalidAge} name="age" onChange={(e) => handleAgeChange(e)} />
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
                                    <Input type='text' invalid={invalidAddress} name="address" onChange={(e) => handleAddressChange(e)} />
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
                                    <Input type='textarea' invalid={invalidBiography} name="biography" onChange={(e) => handleBiographyChange(e)} />
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

export default AddTeacher
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Chip, Container, Grid, InputLabel, Paper, Select, Tooltip, useTheme, MenuItem, OutlinedInput, FormControl } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function AddStaff() {

    const baseUrl = "https://localhost:7069";
    const navigate = useNavigate();

    const [invalidFullName, setInvalidFullName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidAge, setInvalidAge] = useState(false);
    const [invalidAddress, setInvalidAddress] = useState(false);
    const [invalidBiography, setInvalidBiography] = useState(false);
    const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
    const [invalidFullNameMessage, setInvalidFullNameMessage] = useState("");
    const [invalidPhoneMessage, setInvalidPhoneMessage] = useState("");
    const [invalidAgeMessage, setInvalidAgeMessage] = useState("");
    const [invalidAddressMessage, setInvalidAddressMessage] = useState("");
    const [invalidBiographyMessage, setInvalidBiographyMessage] = useState("");

    // a bala formik isheldin bu ne zulmdu ahahah

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [biography, setBiography] = useState("");
    const [positionIds, setPositionIds] = useState([]);
    const [file, setFile] = useState(null);
    const [positions, setPositions] = useState([]);

    const newEmployee = {
        fullName: fullName, email: email, phone: phone, address: address,
        age: age, biography: biography, photo: file, positionIds: positionIds
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newEmployee)) {
            if (key === 'positionIds') {
                value.forEach((val, index) => {
                    formData.append(`positionIds[${index}]`, val)
                })
                continue;
            }
            formData.append(key, value);
        };


        try {
            await axios.post(`${baseUrl}/api/staff/create`, formData, {
                headers: {
                    Accept: "*/*",
                    'Content-Type': 'multipart/form-data'
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
                    navigate("/staff")
                })

        }
        catch (error) {
            console.log(error);
            const errors = error.response.data.errors;
            if (errors.FullName !== undefined) {
                if (errors.FullName.length > 0) {
                    setInvalidFullName(true);
                    setInvalidFullNameMessage(errors.FullName)
                }
            }
            if (errors.Email !== undefined) {
                if (errors.Email.length > 0) {
                    setInvalidEmail(true);
                    setInvalidEmailMessage(errors.Email)
                }
            }
            if (errors.Phone !== undefined) {
                if (errors.Phone.length > 0) {
                    setInvalidPhone(true);
                    setInvalidPhoneMessage(errors.Phone)
                }
            }
            if (errors.Age !== undefined) {
                if (errors.Age.length > 0) {
                    setInvalidAge(true);
                    setInvalidAgeMessage(errors.Age)
                }
            }
            if (errors.Address !== undefined) {
                if (errors.Address.length > 0) {
                    setInvalidAddress(true);
                    setInvalidAddressMessage(errors.Address)
                }
            }
            if (errors.Biography !== undefined) {
                if (errors.Biography.length > 0) {
                    setInvalidBiography(true);
                    setInvalidBiographyMessage(errors.Biography)
                }
            }
        }
    };
    const getPositionsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/position/getall`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setPositions(res.data);
                    }
                })

        } catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        setInvalidFullName(false);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setInvalidEmail(false);
    };

    const handlePositionChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
        setPositionIds(selectedValues);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setInvalidAddress(false)
    };
    const handleAgeChange = (e) => {
        setAge(e.target.value);
        setInvalidAge(false)
    };
    const handleBiographyChange = (e) => {
        setBiography(e.target.value);
        setInvalidBiography(false);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setInvalidPhone(false)
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    useEffect(() => {
        getPositionsAsync()
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
                                    <InputGroupText>Bio</InputGroupText>
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
                            <FormGroup >
                                <InputGroup>
                                    <Input type="select" name='select' multiple onChange={(e) => handlePositionChange(e)} >
                                        {
                                            positions.map(function (position, i) {
                                                return <option value={position.id} key={i}>{position.name}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/staff'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='add' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'><FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#0ae60d", }} /></Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default AddStaff
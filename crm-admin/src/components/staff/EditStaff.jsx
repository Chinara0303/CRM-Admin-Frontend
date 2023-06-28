import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditStaff() {
    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";

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

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [biography, setBiography] = useState("");
    const [file, setFile] = useState(null);
    const [positionIds, setPositionIds] = useState([]);
    const [positions, setPositions] = useState([]);
    const [image, setImage] = useState();
    const [staff, setStaff] = useState([]);

    const newEmployee = {
        fullName: fullName, email: email, phone: phone, address: address,
        age: age, biography: biography, photo: file, positionIds: positionIds
    };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/staff/getbyid/${id}`)
                .then((res) => {
                    setStaff(res.data);
                    setFullName(res.data.fullName);
                    setAddress(res.data.address);
                    setPhone(res.data.phone);
                    setAge(res.data.age);
                    setBiography(res.data.biography);
                    setEmail(res.data.email);
                    setImage(res.data.image);
                    setPositionIds(res.data.positionIds);
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
            await axios.put(`${baseUrl}/api/staff/update/${id}`, formData).then(() => {
                navigate("/staff")
            })
        }
        catch (error) {
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

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        setInvalidFullName(false)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setInvalidEmail(false);
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
    const handlePositionChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
        setPositionIds(selectedValues);
    };

    const getPositionsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/position/getall`).then((res) => {
                if (res.data.length > 0) {
                    setPositions(res.data)
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
        getAsync(id)
        getPositionsAsync();
    }, []);


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
                        {
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
                                    <Input type='file' />
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
                                    <InputGroupText>Bio</InputGroupText>
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
                            <FormGroup >
                                <InputGroup>
                                    <InputGroupText>Position</InputGroupText>
                                    <Input type="select" name='select' value={positionIds} multiple onChange={(e) => handlePositionChange(e)} >
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
                            <Button type='submit' style={{ border: "none" }} color='transparent'>
                                <Tooltip title='add' arrow placement="bottom-start">
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

export default EditStaff
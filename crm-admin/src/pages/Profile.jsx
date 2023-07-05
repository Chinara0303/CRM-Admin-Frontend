import { faArrowRightFromBracket, faChevronLeft, faFloppyDisk, faHouse, faHouseChimneyWindow, faKey, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper, Tooltip, Container, Grid, List, ListItem, Button, Modal, Typography, Alert } from '@mui/material'
import React from 'react'
import { Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function Profile(props) {
    const baseUrl = "https://localhost:7069";
    const token = JSON.parse(localStorage.getItem('user-info'));

    const [open, setOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [subscribes, setSubscribes] = useState([]);
    const [user, setUser] = useState([]);
    const [positions, setPositions] = useState([]);

    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidAge, setInvalidAge] = useState(false);
    const [invalidAddress, setInvalidAddress] = useState(false);
    const [invalidBiography, setInvalidBiography] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [biography, setBiography] = useState("");
    const [file, setFile] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    const [invalidPhoneMessage, setInvalidPhoneMessage] = useState("");
    const [invalidAgeMessage, setInvalidAgeMessage] = useState("");
    const [invalidAddressMessage, setInvalidAddressMessage] = useState("");
    const [invalidBiographyMessage, setInvalidBiographyMessage] = useState("");
    const [invalidMessage, setInvalidMessage] = useState([]);

    const updateEmployee = { phoneNumber: phoneNumber, address: address, age: age, biography: biography, photo: file }
    const updatePassword = { oldPassword: oldPassword, newPassword: newPassword }

    const handleOpen = () => setOpen(true);
    const handleClick = () => setClick(true);

    const handleClose = () => {
        setOpen(false);
        setInvalid(false);
        setInvalidAddress(false);
        setInvalidPhone(false);
        setInvalidAge(false);
        setInvalidBiography(false);
    };
    const handleDeClick = () => {
        setClick(false);
    };
    const handleChangeClick = () => props.setChange(!props.change)


    const getAllAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/subscribe/getall`, { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    if (res.data.length > 0) {
                        setSubscribes(res.data)
                    }
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

    const getUserInfoAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/account/profile/`,
                {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then((res) => {
                    setUser(res.data)
                    setPositions(res.data.roleNames)
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

        for (const [key, value] of Object.entries(updateEmployee)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/account/userUpdate`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    Accept: "*/*",
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Updated',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                })
                .then(() => {
                    setOpen(false)
                    getUserInfoAsync()
                })

        }
        catch (error) {
            const errors = error.response.data;
            if (errors != undefined) {
                if (errors.length > 0) {
                    setInvalid(true)
                    setInvalidMessage(errors.errors)
                }
            }

            if (errors.errors != undefined) {
                if (errors.errors.PhoneNumber !== undefined) {
                    setInvalidPhone(true);
                    setInvalidPhoneMessage(errors.errors.PhoneNumber)
                }
                if (errors.errors.Age !== undefined) {
                    setInvalidAge(true);
                    setInvalidAgeMessage(errors.errors.Age)
                }
                if (errors.errors.Address !== undefined) {
                    setInvalidAddress(true);
                    setInvalidAddressMessage(errors.errors.Address)
                }
                if (errors.errors.Biography !== undefined) {
                    setInvalidBiography(true);
                    setInvalidBiographyMessage(errors.errors.Biography)
                }
            }
        }
    };
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(updatePassword)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/account/changepassword`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    Accept: "*/*",
                }
            })
                .then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Updated',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                })
                .then(() => {
                    setClick(false)
                })

        }
        catch (error) {
            const errors = error.response.data;
            if (errors != undefined) {
                if (errors.length > 0) {
                    setInvalid(true)
                    setInvalidMessage(errors.errors)
                }
            }

            if (errors.errors != undefined) {
                if (errors.errors.OldPassword !== undefined) {
                    setInvalidPhone(true);
                    setInvalidPhoneMessage(errors.errors.OldPassword)
                }
                if (errors.errors.NewPassword !== undefined) {
                    setInvalidPhone(true);
                    setInvalidPhoneMessage(errors.errors.NewPassword)
                }
            }
        }
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
        setPhoneNumber(e.target.value);
        setInvalidPhone(false)
        setInvalid(false)
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setInvalid(false)
    };
    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
        setInvalid(false)
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setInvalid(false)
    };

    useEffect(() => {
        getAllAsync();
        getUserInfoAsync();
    }, [])

    return (
        <div className='profile-area'>
            <div className="title-area">
                <Paper>
                    <Box>
                        <div className="left-side">
                            <div className="logo-area">
                                <img className='img-fluid' src={`data:image/;base64,${user.image}`} alt="" />
                            </div>
                            <div className="info-area">
                                <h4>{user.fullName}</h4>
                                {
                                    positions.map(function (roleName, i) {
                                        return <p key={i}>{roleName}</p>
                                    })
                                }
                            </div>
                        </div>
                        <div className="right-side">
                            <NavLink to='/site/dashboard' onClick={() => handleChangeClick()}>
                                {
                                    props.change && (
                                        <Tooltip title="Site" arrow>
                                            <FontAwesomeIcon icon={faHouseChimneyWindow} size='2xl' style={{ color: "white" }} />
                                        </Tooltip>
                                    )
                                }
                                {
                                    !props.change && (
                                        <Tooltip title="Management" arrow>
                                            <FontAwesomeIcon icon={faHouse} size='xl' style={{ color: "white" }} />
                                        </Tooltip>
                                    )
                                }
                            </NavLink>
                            <Button type="button" >
                                <Tooltip title="Logout" arrow> 
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="2xl" style={{ color: "white", cursor: "pointer" }} />
                                </Tooltip>
                            </Button>
                        </div>
                    </Box>
                </Paper>
            </div>
            <Paper style={{ marginTop: "30px", padding: "30px 0" }}>
                <Container>
                    <Grid container spacing={10} >
                        <Grid item lg={6} xs={12} sm={6}>
                            <div className="profile-detail">
                                <div className="top-area">
                                    <p>Profile information</p>
                                    <Button onClick={() => handleOpen()}>
                                        <FontAwesomeIcon icon={faPen} size="lg" style={{ color: "#5d5d5d", cursor: 'pointer' }} />
                                    </Button>
                                    <Button onClick={() => handleClick()}>
                                        <FontAwesomeIcon icon={faKey} size="lg" style={{ color: "#5d5d5d", cursor: 'pointer' }} />
                                    </Button>
                                    <div>
                                        <Modal
                                            open={open}
                                            onClose={handleClose} >
                                            <Box sx={style}>
                                                <p>Edit personal information</p>
                                                <Form onSubmit={(e) => handleSubmit(e)}>
                                                    <FormGroup>
                                                        {
                                                            invalid && (
                                                                <Alert severity="error">{invalidMessage}</Alert>
                                                            )
                                                        }
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type='file' id='file' onChange={handleFileChange} />
                                                        <Label className='btn-2' style={{ width: "43%" }} for='file'>Upload</Label>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText>Address</InputGroupText>
                                                            <Input type='text' value={address} name="address" invalid={invalidAddress} onChange={handleAddressChange} />
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
                                                            <InputGroupText >Mobile</InputGroupText>
                                                            <Input type='text' value={phoneNumber} name="phoneNumber" invalid={invalidPhone} onChange={handlePhoneChange} />
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
                                                            <InputGroupText >Age</InputGroupText>
                                                            <Input type='number' value={age} name="age" invalid={invalidAge} onChange={handleAgeChange} />
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
                                                            <InputGroupText >Biography</InputGroupText>
                                                            <Input type='textarea' value={biography} name="biography" invalid={invalidBiography} onChange={handleBiographyChange} />
                                                            {
                                                                invalidBiography && (
                                                                    <FormFeedback invalid>
                                                                        {invalidBiographyMessage}
                                                                    </FormFeedback>
                                                                )
                                                            }
                                                        </InputGroup>
                                                    </FormGroup>
                                                    {/* <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Change Password</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup> */}
                                                    {/* <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Linkedin</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Twitter</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Facebook</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup> */}
                                                    <Tooltip title='Close' arrow placement="bottom-start">
                                                        <FontAwesomeIcon onClick={handleClose} icon={faChevronLeft} size="2xl" style={{ color: "#005eff", cursor: 'pointer' }} />
                                                    </Tooltip>
                                                    <Button type='submit' style={{ border: "none" }}>
                                                        <Tooltip title='save'>
                                                            <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d" }} />
                                                        </Tooltip>
                                                    </Button>
                                                </Form>
                                            </Box>
                                        </Modal>

                                    </div>
                                </div>
                                <div className="bottom-area mt-2">
                                    <p>{user.biography}</p>
                                    <List>
                                        <ListItem>
                                            Fullname: {user.fullName}
                                        </ListItem>
                                        <ListItem>
                                            Mobile: {user.phoneNumber}
                                        </ListItem>
                                        <ListItem>
                                            Email: {user.email}
                                        </ListItem>
                                    </List>
                                </div>
                                <div>
                                    <Modal
                                        open={click}
                                        onClose={handleDeClick} >
                                        <Box sx={style}>
                                            <p>Edit password</p>
                                            <Form onSubmit={(e) => handlePasswordSubmit(e)}>
                                                <FormGroup>
                                                    {
                                                        invalid && (
                                                            <Alert severity="error">{invalidMessage}</Alert>
                                                        )
                                                    }
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupText >Old Password</InputGroupText>
                                                        <Input type='password' name="oldPassword" onChange={handleOldPasswordChange} />
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupText >New Password</InputGroupText>
                                                        <Input type='password' name="newPassword" onChange={handleNewPasswordChange} />
                                                    </InputGroup>
                                                </FormGroup>
                                                <Tooltip title='Close' arrow placement="bottom-start">
                                                    <FontAwesomeIcon onClick={handleDeClick} icon={faChevronLeft} size="2xl" style={{ color: "#005eff", cursor: 'pointer' }} />
                                                </Tooltip>
                                                <Button type='submit' style={{ border: "none" }}>
                                                    <Tooltip title='save'>
                                                        <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d" }} />
                                                    </Tooltip>
                                                </Button>
                                            </Form>
                                        </Box>
                                    </Modal>

                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={6} xs={12} sm={6}>
                            <div className="subscribe-area" style={{ overflowY: "scroll", height: "400px" }}>
                                <div className="top-area">
                                    <p>Subscribes</p>
                                </div>
                                <div className="bottom-area">
                                    {
                                        subscribes.map(function (subscribe, i) {
                                            return <div key={i} className="subscribe">
                                                <p>{subscribe.email}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </Container>
            </Paper>
        </div>
    )
}

export default Profile
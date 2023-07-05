import { Box, Button, FormControlLabel, FormGroup, Paper, Switch, TextField, Grid, Container, Alert } from '@mui/material'
import { Form } from 'reactstrap'
import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BgImage from '../assets/images/signin-bg.jpeg'


function SignIn() {
    const baseUrl = "https://localhost:7069";
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState([]);

    const newUser = { email: email, password: password, isRememberMe: isRememberMe };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newUser)) {
            formData.append(key, value);
        };

        try {
            await axios.post(`${baseUrl}/api/account/signin`, formData, {
                headers: {
                    Accept: "*/*",
                }
            })
                .then((res) => {
                    if (res.data.errors !== null) {
                        setInvalid(true)
                        setInvalidMessage(res.data.errors)
                    }
                    if (res.data.statusMessage === "Success") {
                        localStorage.setItem("user-info",JSON.stringify(res.data.token));
                        navigate("/dashboard")
                    }
                })
        }
        catch (error) {
            const errors = error.response.data;
            if (errors.length > 0) {
                setInvalid(true)
                setInvalidMessage(errors)
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/dashboard')
        }
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setInvalid(false)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setInvalid(false)
    }
    const handleIsRememberMeChange = (e) => {
        setIsRememberMe(true)
        setInvalid(false)
    }

    return (
        <div className='signin-area' style={{ backgroundImage: `url(${BgImage})`, height: "100vh" }}>
            <Box>
                <Paper>
                    <div className='top-area'>
                        <h4>Sign In</h4>
                    </div>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <FormGroup>
                            {
                                invalid && (
                                    <Alert severity="error">{invalidMessage}</Alert>
                                )
                            }

                        </FormGroup>
                        <FormGroup>
                            <div className="inputs">
                                <TextField id="outlined-basic" label="Email" variant="outlined" name='email' onChange={handleEmailChange} />
                                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' name='password' onChange={handlePasswordChange} />
                            </div>
                            <FormControlLabel control={<Switch />} label="Remember me" name='IsRememberMe' onChange={handleIsRememberMeChange} />
                            <Button type="submit" variant="contained">Sign in</Button>
                        </FormGroup>
                    </Form>
                </Paper>
            </Box>
        </div>
    )
}

export default SignIn
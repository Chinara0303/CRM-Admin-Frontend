import { Box, Button, FormControlLabel, FormGroup, Paper, Switch, TextField, Grid, Container } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom'
import BgImage from '../assets/images/signin-bg.jpeg'


function SignIn() {
  
    return (
        <div className='signin-area' style={{ backgroundImage: `url(${BgImage})`,height:"100vh" }}>
            <Box>
                <Paper>
                    <div className='top-area'>
                        <h4>Sign In</h4>
                    </div>
                    <FormGroup>
                        <div className="inputs">
                            <TextField id="outlined-basic" label="Email" variant="outlined" type='email' />
                            <TextField id="outlined-basic" label="Password" variant="outlined" type='password' />
                        </div>
                        <FormControlLabel control={<Switch />} label="Remember me" />
                        <Button variant="contained">Sign in</Button>
                    </FormGroup>
                </Paper>
            </Box>
        </div>
    )
}

export default SignIn
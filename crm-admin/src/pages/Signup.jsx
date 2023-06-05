import { Box, Button, FormControlLabel, FormGroup, Paper, Switch, TextField, Grid, Container } from '@mui/material'
import BgImage from '../assets/images/signin-bg.jpeg'
import React from 'react'

function Signup() {
  return (
    <div className='signin-area' style={{ backgroundImage: `url(${BgImage})` }}>
            <Box>
                <Paper>
                    <div className='top-area'>
                        <h4>Sign up</h4>
                    </div>
                    <FormGroup>
                        <div className="inputs">
                           <TextField id="outlined-basic" label="FullName" variant="outlined" type='text' />
                            <TextField id="outlined-basic" label="Email" variant="outlined" type='email' />
                            <TextField id="outlined-basic" label="Password" variant="outlined" type='password' />
                        </div>
                        <FormControlLabel control={<Switch />} label="Remember me" />
                        <Button variant="contained">Sign up</Button>
                    </FormGroup>
                </Paper>
            </Box>
        </div>
  )
}

export default Signup
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React from 'react'

function DetailtTeacher() {
    return (
        <div className='detail-area area'>
            <div className="title-area">
                <Paper>
                    <h4>Detail</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper>
                        <div className="single-area">
                            <img className='img-fluid' src={require('../../assets/images/download.jpeg')} alt="" />
                        </div>
                        <Tooltip title='Full name' placement='left' arrow>
                            <div className="single-area">
                                <p>Chinara Ibadova</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Email' placement='left' arrow>
                            <div className="single-area">
                                <p>test@gmail.com</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Address' placement='left' arrow>
                            <div className="single-area">
                                <p>Lokbatan</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Salary' placement='left' arrow>
                            <div className="single-area">
                                <p>44</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Go to list'  arrow placement="bottom-start">
                            <NavLink to='/teachers'>
                                <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                            </NavLink>
                        </Tooltip>
                        
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default DetailtTeacher
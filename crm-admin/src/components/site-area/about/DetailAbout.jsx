import { faChevronLeft,faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React from 'react'

function DetailAbout() {
    return (
        <div className='detail-area'>
            <div className="title-area">
                <Paper>
                    <h4>Detail</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper>
                        <Tooltip title='Image' placement='left' arrow>
                            <div className="single-area">
                                <img className='img-fluid' src={require('../../../assets/images/download.jpeg')} alt="" />
                            </div>
                        </Tooltip>
                        <Tooltip title='Title' placement='left' arrow>
                            <div className="single-area">
                                <p>Chinara Ibadova</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Subtitle' placement='left' arrow>
                            <div className="single-area">
                                <p>test@gmail.com</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Description' placement='left' arrow>
                            <div className="single-area">
                                <p>050....</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Go to list' arrow placement="bottom-start">
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

export default DetailAbout
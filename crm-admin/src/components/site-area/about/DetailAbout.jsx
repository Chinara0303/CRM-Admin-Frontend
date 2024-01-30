import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useParams } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

function DetailAbout() {
    const { id } = useParams();
   const baseUrl = "https://localhost:7069";
    const [about, setAbout] = useState([]);

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/about/getbyid/${id}`)
                .then((res) => {
                    setAbout(res.data);
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
    useEffect(() => {
        getAsync(id)
    }, [])


    return (
        <div className='detail-area'>
            <div className="title-area">
                <Paper>
                    <h4>Detail</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    {
                        <Paper>
                            <Tooltip title='Image' placement='left' arrow>
                                <div className="single-area">
                                    <img className='img-fluid' src={`data:image;base64,${about.image}`} alt="" />
                                </div>
                            </Tooltip>
                            <Tooltip title='Title' placement='left' arrow>
                                <div className="single-area">
                                    <p>{about.title}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Subtitle' placement='left' arrow>
                                <div className="single-area">
                                    <p>{about.subTitle}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Description' placement='left' arrow>
                                <div className="single-area">
                                    <p>{about.description}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Created Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(about.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Updated Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(about.modifiedDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/site/about'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff"}} />
                                </NavLink>
                            </Tooltip>
                        </Paper>
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default DetailAbout
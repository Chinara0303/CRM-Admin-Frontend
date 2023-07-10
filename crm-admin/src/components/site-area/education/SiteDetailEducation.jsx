import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useParams } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment';


function SiteDetailEducation() {
    const { id } = useParams();
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const [education, setEducation] = useState([]);

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/education/getbyid/${id}`)
                .then((res) => {
                    setEducation(res.data);
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
                    <Paper>
                        <Tooltip title='Image' placement='left' arrow>
                            <div className="single-area">
                                <img className='img-fluid' src={`data:image;base64,${education.image}`} alt="" />
                            </div>
                        </Tooltip>
                        <Tooltip title='Name' placement='left' arrow>
                            <div className="single-area">
                                <p>{education.name}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Price' placement='left' arrow>
                            <div className="single-area">
                                <p>{education.price}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Description' placement='left' arrow>
                            <div className="single-area">
                                <p>{education.description}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Promise' placement='left' arrow>
                            <div className="single-area">
                                <p>{education.promise}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Duration' placement='left' arrow>
                            <div className="single-area">
                                <p>{education.duration}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Group Count' placement='left' arrow>
                            <div className="single-area">
                                <p>{education.groupCount}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Created Date' placement='left' arrow>
                            <div className="single-area">
                                <p>{moment(education.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Updated Date' placement='left' arrow>
                            <div className="single-area">
                                <p>{moment(education.modifiedDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Go to list' arrow placement="bottom-start">
                            <NavLink to='/site/educations'>
                                <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                            </NavLink>
                        </Tooltip>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default SiteDetailEducation
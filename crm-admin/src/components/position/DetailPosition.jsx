import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function DetailPosition() {
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";

    const [position, setPosition] = useState([]);
    

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/position/getbyid/${id}`)
                .then((res) => {
                    setPosition(res.data);
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
                            <Tooltip title='Name' placement='left' arrow>
                                <div className="single-area">
                                    <p>{position.name}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Staff Count' placement='left' arrow>
                                <div className="single-area">
                                    <p>{position.staffCount}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Created Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(position.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Updated Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(position.modifiedDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/positions'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff" }} />
                                </NavLink>
                            </Tooltip>
                        </Paper>
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default DetailPosition

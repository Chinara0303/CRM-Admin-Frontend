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

function DetailTime() {
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";

    const [time, setTime] = useState([]);
    const [seans, setSeans] = useState([]);
    
    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/time/getbyid/${id}`)
                .then((res) => {
                    setTime(res.data);
                    getSeansById(res.data.seansId)
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
    const getSeansById = async (seansId)=>{
        try {
            await axios.get(`${baseUrl}/api/seans/getbyid/${seansId}`)
                .then((res) => {
                    setSeans(res.data);
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
                            <Tooltip title='Interval' placement='left' arrow>
                                <div className="single-area">
                                    <p>{time.interval}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Seans name' placement='left' arrow>
                                <div className="single-area">
                                    <p>{seans?.name}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Created Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(time.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Updated Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(time.modifiedDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/time'>
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

export default DetailTime

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React,{ useState,useEffect } from 'react'
import moment from 'moment';
import { NavLink, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function DetailRoom() {
    const { id } = useParams();
   const baseUrl = "https://localhost:7069";

    const [room, setRoom] = useState([]);

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/room/getbyid/${id}`)
                .then((res) => {
                    setRoom(res.data);
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
                                    <p>{room.name}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Capacity' placement='left' arrow>
                                <div className="single-area">
                                    <p>{room.capacity}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Group Count' placement='left' arrow>
                                <div className="single-area">
                                    <p>{room.groupCount}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Created Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(room.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Updated Date' placement='left' arrow>
                                <div className="single-area">
                                    <p>{moment(room.modifiedDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/rooms'>
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

export default DetailRoom

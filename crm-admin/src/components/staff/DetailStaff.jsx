import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useParams } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment';

function DetailStaff() {
    const { id } = useParams();
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const [staffMember, setStaffMember] = useState([]);
    const [positions, setPositions] = useState([]);

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/account/getuserbyid/${id}`)
                .then((res) => {
                    setStaffMember(res.data);
                    setPositions(res.data.roleNames)
                })
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
        getAsync(id);

    }, [])

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
                        <Tooltip title='Image' placement='left' arrow>
                            <div className="single-area">
                                <div className="img-detail">
                                    <img className='img-fluid' src={`data:image/;base64,${staffMember.image}`} alt="" />
                                </div>
                            </div>
                        </Tooltip>
                        <Tooltip title='Full name' placement='left' arrow>
                            <div className="single-area">
                                <p>{staffMember.fullName}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Email' placement='left' arrow>
                            <div className="single-area">
                                <p>{staffMember.email}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Address' placement='left' arrow>
                            <div className="single-area">
                                <p>{staffMember.address}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Phone' placement='left' arrow>
                            <div className="single-area">
                                <p>{staffMember.phoneNumber}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Biography' placement='left' arrow>
                            <div className="single-area">
                                <p>{staffMember.biography}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Position' placement='left' arrow>
                            <div className="single-area">
                                {
                                    positions.map(function (roleName, i) {
                                        return <p key={i}>{roleName}</p>
                                    })
                                }
                            </div>
                        </Tooltip>
                        <Tooltip title='Go to list' arrow placement="bottom-start">
                            <NavLink to='/staff'>
                                <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                            </NavLink>
                        </Tooltip>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default DetailStaff
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useParams } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment';

function DetailStudent() {
    const { id } = useParams();
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";

    const [student, setStudent] = useState([]);
    const [group, setGroup] = useState();

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/student/getbyid/${id}`)
                .then((res) => {
                    setStudent(res.data);
                    getByGroupId(res.data.groupId)
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
    const getByGroupId = async (groupId)=>{
        try {
            await axios.get(`${baseUrl}/api/group/getbyid/${groupId}`)
                .then((res) => {
                    setGroup(res.data);
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
                                <img className='img-fluid' src={`data:image;base64,${student.image}`} alt="" />
                            </div>
                        </Tooltip>
                     
                        <Tooltip title='Full name' placement='left' arrow>
                            <div className="single-area">
                                <p>{student.fullName}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Email' placement='left' arrow>
                            <div className="single-area">
                                <p>{student.email}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Address' placement='left' arrow>
                            <div className="single-area">
                                <p>{student.address}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Phone' placement='left' arrow>
                            <div className="single-area">
                                <p>{student.phone}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Group' placement='left' arrow>
                            <div className="single-area">
                                <p>{group?.name}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Created Date' placement='left' arrow>
                            <div className="single-area">
                                <p>{moment(student.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Updated Date' placement='left' arrow>
                            <div className="single-area">
                                <p>{moment(student.modifiedDate).format('DD-MM-YYYY HH:mm:ss')}</p>
                            </div>
                        </Tooltip>
                        <Tooltip title='Go to list' arrow placement="bottom-start">
                            <NavLink to='/students'>
                                <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                            </NavLink>
                        </Tooltip>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default DetailStudent
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function Education() {
    const [showTable, setShowTable] = useState(false);
    const [educations, setEducations] = useState([]);
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    let count = 1;
    const token = JSON.parse(localStorage.getItem('user-info'));
   
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userRole = decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;

    const getAllAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/education/getall`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setShowTable(true);
                        setEducations(res.data)
                    }
                    else {
                        setShowTable(false)
                    }
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
    const remove = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`${baseUrl}/api/education/softdelete/${id}`,
                     { headers: { "Authorization": `Bearer ${token}` } })
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            )
                            getAllAsync();
                        });

                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Do you want to continue',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            }
        })
    }

    useEffect(() => {
        getAllAsync();
    }, [])

    return (
        <div className='area'>
            {userRole.includes("Admin") ?
                <Tooltip title='Add' arrow placement="top-start">
                    <NavLink to='/educations/create'>
                        <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                    </NavLink>
                </Tooltip>
                : null
            }
            {
                showTable && (
                    <Paper style={{ marginTop: "30px" }}>
                        <TableContainer>
                            <Table>
                                <TableHead >
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Group Count</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        educations.map(function (education, i) {
                                            return <TableRow key={i}>
                                                <TableCell >{count++}</TableCell>
                                                <TableCell>
                                                    <div className="image-area">
                                                        <img src={`data:image/png;base64,${education.image}`} />
                                                    </div>
                                                </TableCell>
                                                <TableCell>{education.name}</TableCell>
                                                <TableCell>{education.groupCount}</TableCell>
                                                <TableCell>
                                                    <div className="actions">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/educations/detail/${education.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} />
                                                                </NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        {userRole.includes("Admin") || userRole.includes("SalesManager") ?
                                                            <>
                                                                <Tooltip title='Edit' placement='top-start'>
                                                                    <MenuItem>
                                                                        <NavLink to={`/educations/edit/${education.id}`}>
                                                                            <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} />
                                                                        </NavLink>
                                                                    </MenuItem>
                                                                </Tooltip>
                                                                <Tooltip title='Delete' placement='top-start'>
                                                                    <Button onClick={(id) => remove(education.id)}>
                                                                        <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} />
                                                                    </Button>
                                                                </Tooltip>
                                                            </>
                                                            : null
                                                        }

                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                )
            }

        </div>
    )
}

export default Education
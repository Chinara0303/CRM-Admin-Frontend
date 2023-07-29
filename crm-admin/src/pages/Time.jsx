import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button, debounce } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function Time() {
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const token = JSON.parse(localStorage.getItem('user-info'));
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userRole = decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;

    const [showTable, setShowTable] = useState(false);
    const [time, setTime] = useState([]);

    let count = 1;

    const getAllAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/time/getall`)
                .then((res) => {
                    if (res.data.length <= 0) {
                        setShowTable(false)
                    }
                    if (res.data.length > 0) {
                        setShowTable(true);
                        setTime(res.data);
                    }
                }
                );

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
                    axios.delete(`${baseUrl}/api/time/softdelete/${id}`,
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
        <div className='area mt-1' >
            {userRole.includes("Admin") ?
                <Tooltip title='Add' arrow placement="top-start">
                    <NavLink to='/time/create'>
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
                                        <TableCell>Interval</TableCell>
                                        <TableCell>Seans</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        time.map(function (time, i) {
                                            return <TableRow key={i}>
                                                <TableCell>{count++}</TableCell>
                                                <TableCell>{time.interval}</TableCell>
                                                <TableCell>
                                                    {time.seansName}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="actions">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/time/detail/${time.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} />
                                                                </NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        {userRole.includes("Admin") ?
                                                            <Tooltip title='Edit' placement='top-start'>
                                                                <MenuItem>
                                                                    <NavLink to={`/time/edit/${time.id}`}>
                                                                        <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} />
                                                                    </NavLink>
                                                                </MenuItem>
                                                            </Tooltip>
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

export default Time
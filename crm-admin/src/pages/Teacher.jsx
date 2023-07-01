import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function Teacher() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [showTable, setShowTable] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [filterValue, setFilterValue] = useState("ascending");

    const baseUrl = "https://localhost:7069";
    let count = 1;

    const getAllAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getall`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setShowTable(true);
                        setTeachers(res.data);
                        // setFilteredTeachers(res.data)
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
                    axios.delete(`${baseUrl}/api/teacher/softdelete/${id}`)
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

    const getSearchDatasAsync = async (searchText) => {
        try {
            await axios.post(`${baseUrl}/api/teacher/search?searchText=${searchText}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setTeachers(res.data);
                    }
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
    const getFilteredDatasAsync = async () => {
        try {
            await axios.post(`${baseUrl}/api/teacher/filter?filterValue=${filterValue}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setTeachers(res.data);
                    }
                });
        } catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    };
    useEffect(() => {
        getAllAsync();
    }, [])

    return (
        <div className='area'>
            <div className="d-flex justify-content-between">

                <Tooltip title='Add' arrow placement="top-start">
                    <NavLink to='/teachers/create'>
                        <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                    </NavLink>
                </Tooltip>
                <div className="right d-flex ">
                    <Tooltip title='Age' arrow placement="top-start">
                        <div onClick={() => getFilteredDatasAsync(setFilterValue(filterValue === "ascending" ? "descending" :"ascending"))} className="arrow-down-up mx-2">
                            <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </div>
                    </Tooltip>
                    <TextField onChange={(e) => getSearchDatasAsync(e.target.value)} id="outlined-basic" className='d-lg-block d-md-block d-none' label="Search..." variant="outlined" />
                </div>
            </div>
            {
                showTable && (
                    <Paper style={{ marginTop: "30px" }}>
                        <TableContainer>
                            <Table>
                                <TableHead >
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Full name</TableCell>
                                        <TableCell>Age</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        teachers.map(function (teacher, i) {
                                            return <TableRow key={i}>
                                                <TableCell>{count++}</TableCell>
                                                <TableCell>
                                                    <div className="image-area">
                                                        <img src={`data:image/png;base64,${teacher.image}`} />
                                                    </div>
                                                </TableCell>
                                                <TableCell>{teacher.fullName}</TableCell>
                                                <TableCell>{teacher.age}</TableCell>
                                                <TableCell>
                                                    <div className="d-flex">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/teachers/detail/${teacher.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} /></NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        <Tooltip title='Edit' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/teachers/edit/${teacher.id}`}><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        <Tooltip title='Delete' placement='top-start'>
                                                            <MenuItem>
                                                                <Button type="button" onClick={(id) => remove(teacher.id)}><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
                                                            </MenuItem>
                                                        </Tooltip>
                                                    </div>
                                                    {/* <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >
                                                    <FontAwesomeIcon icon={faAlignRight} size='xl' style={{ color: "#174873" }} />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    <Tooltip title='Info' placement='top-start'>
                                                        <MenuItem>
                                                            <NavLink to='/teachers/detail/id'><FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} /></NavLink>
                                                        </MenuItem>
                                                    </Tooltip>
                                                    <Tooltip title='Edit' placement='top-start'>
                                                        <MenuItem>
                                                            <NavLink to='/teachers/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                                                        </MenuItem>
                                                    </Tooltip>
                                                    <Tooltip title='Delete' placement='top-start'>
                                                        <MenuItem>
                                                            <Button><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
                                                        </MenuItem>
                                                    </Tooltip>
                                                </Menu> */}
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

export default Teacher
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function About() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [showCreateArea, setShowCreateArea] = useState(true);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [about, setAbout] = useState([]);
    const baseUrl = "https://localhost:7069";
    let count = 1;

    const getAllAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/about/getall`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setShowTable(true);
                        setShowCreateArea(false)
                        setAbout(res.data)
                    }
                    else {
                        setShowTable(false)
                        setShowCreateArea(true)
                    }
                });

        } catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            console.log(error);
        }
    }

    useEffect(() => {
        getAllAsync();
    }, [])

    return (
        <div className='area'>
            {
                showCreateArea && (
                    <Tooltip title='Add' arrow placement="top-start">
                        <NavLink to='/site/about/create'>
                            <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                        </NavLink>
                    </Tooltip>
                )
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
                                        <TableCell>Title</TableCell>
                                        <TableCell>Subtitle</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        about.map(function (about, i) {
                                            return <TableRow key={i}>
                                                <TableCell>{count++}</TableCell>
                                                <TableCell>
                                                    <div className="image-area">
                                                        <img src={`data:image;base64,${about.image}`} />
                                                    </div>
                                                </TableCell>
                                                <TableCell>{about.title}</TableCell>
                                                <TableCell>{about.subTitle}</TableCell>
                                                <TableCell>{about.description}</TableCell>
                                                <TableCell>
                                                    <div className="d-flex">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/site/about/detail/${about.id}`}><FontAwesomeIcon icon={faCircleInfo} size="xl" style={{ color: "#d0fa00", }} /></NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        <Tooltip title='Edit' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/site/about/edit/${about.id}`}><FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#2ab404", }} /></NavLink>
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
                                                                <NavLink to='/site/about/detail/id'><FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} /></NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        <Tooltip title='Edit' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to='/site/about/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
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

export default About
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faSquarePlus, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button } from '@mui/material';

function StaffPosition() {
    return (
        <div className='area'>
            <Tooltip title='Add' arrow placement="top-start">
                <NavLink to='/staffposition/create'>
                    <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                </NavLink>
            </Tooltip>
            <Paper style={{ marginTop: "30px" }}>
                <TableContainer>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Position name</TableCell>
                                <TableCell>Employee image</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Capacity</TableCell>
                                <TableCell>
                                    <div className="position-name">
                                        <span>test </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ display: "flex" }}>
                                    <div className="img-area">
                                        <img className='img-fluid' src={require('../assets/images/download.jpeg')} alt="" />
                                    </div>
                                    <div className="img-area">
                                        <img className='img-fluid' src={require('../assets/images/download.jpeg')} alt="" />
                                    </div>
                                    <div className="img-area">
                                        <img className='img-fluid' src={require('../assets/images/download.jpeg')} alt="" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                <Tooltip title='Edit' placement='top-start'>
                                        <MenuItem>
                                            <NavLink to='/staffposition/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                                        </MenuItem>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default StaffPosition
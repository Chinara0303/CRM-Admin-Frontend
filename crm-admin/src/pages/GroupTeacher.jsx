import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faSquarePlus, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';


function GroupTeacher() {
    const [showTable, setShowTable] = useState(false);
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const baseUrl = "https://localhost:7069";
    let count = 1;

    const getAllAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/group/getall`)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.length > 0) {
                        setShowTable(true);
                        setGroups(res.data);
                        for (const data of res.data) {
                            console.log(data.teacherIds);
                            if (data.teacherIds.length > 0) {
                                for (let i = 0; i < data.teacherIds.length; i++) {
                                    getTeacherAsync(data.teacherIds[i])
                                }
                            }
                        }
                    }
                    else {
                        setShowTable(false)
                    }
                });
        }
        
        catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }


    const getTeacherAsync = async (teacherId) => {
        try {
            await axios.get(`${baseUrl}/api/teacher/${teacherId}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setTeachers(res.data)
                    }
                });

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

    }
    useEffect(() => {
        getAllAsync();
    }, [])

    return (
        <div className='area'>
            <Tooltip title='Add' arrow placement="top-start">
                <NavLink to='/groupteacher/create'>
                    <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                </NavLink>
            </Tooltip>
            {
                showTable && (
                    <Paper style={{ marginTop: "30px" }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Group name</TableCell>
                                        <TableCell>Teacher image</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        groups.map(function (group, i) {
                                            return <TableRow key={i}>
                                                <TableCell>{count++}</TableCell>
                                                <TableCell>
                                                    <div className="group-name">
                                                        <span>{group.name} </span>
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
                                                            <NavLink to='/groupteacher/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                                                        </MenuItem>
                                                    </Tooltip>

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

export default GroupTeacher
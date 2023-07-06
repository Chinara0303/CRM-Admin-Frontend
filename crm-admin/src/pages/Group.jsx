import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function Group() {

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
                        setGroups(res.data)
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
                    axios.delete(`${baseUrl}/api/group/softdelete/${id}`)
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
            <Tooltip title='Add' arrow placement="top-start">
                <NavLink to='/groups/create'>
                    <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                </NavLink>
            </Tooltip>
            {
                showTable && (
                    <Paper style={{ marginTop: "30px" }}>
                        <TableContainer>
                            <Table>
                                <TableHead >
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Teacher full name</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        groups.map(function (group, i) {
                                            return <TableRow key={i}>
                                                <TableCell>{count++}</TableCell>
                                                <TableCell>{group.name}</TableCell>
                                                <TableCell>
                                                    {
                                                       group.teachersInfo.map(function(teacher,i){
                                                        return <span key = {i}>{teacher.fullName.concat(" ")}</span>
                                                       })
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    <div className="actions">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/groups/detail/${group.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="xl" style={{ color: "#d0fa00", }} />
                                                                </NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        <Tooltip title='Edit' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/groups/edit/${group.id}`}>
                                                                    <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#2ab404", }} />
                                                                </NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        <Tooltip title='Delete' placement='top-start'>
                                                            <Button type="button" onClick={(id) => remove(group.id)}>
                                                                <FontAwesomeIcon icon={faTrashCan} size="xl" style={{ color: "#f50000", }} />
                                                            </Button>
                                                        </Tooltip>
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

export default Group
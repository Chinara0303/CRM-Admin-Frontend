import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, Menu, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function Group() {


   const baseUrl = "https://localhost:7069";

    const [showTable, setShowTable] = useState(false);
    const [groups, setGroups] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchValue, setSearchValue] = useState();

    let take = 3;
    let count = (pages.currentPage - 1) * take;

    const token = JSON.parse(localStorage.getItem('user-info'));
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userRole = decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;


    const getAllAsync = async (page) => {
        try {
            await axios.get(`${baseUrl}/api/group/getall?skip=${page}&take=${take}`)
                .then((res) => {
                    setPages(res.data)
                    if (res.data.datas.length > 0) {
                        setShowTable(true);
                        setGroups(res.data.datas)
                        setTotalPage(res.data.totalPage)
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

    const getSearchResultDatasAsync = async (searchText, page) => {
        setSearchValue(searchText)
        try {
            await axios.post(`${baseUrl}/api/group/search?searchText=${searchText}&skip=${page}&take=${take}`)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.datas.length > 0) {
                        setGroups(res.data.datas);
                        setTotalPage(res.data.totalPage)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e, page) => {
        setCurrentPage(page);
        if (searchValue === undefined) {
            getAllAsync(page)
        }
        if (searchValue !== undefined) {
            getSearchResultDatasAsync(searchValue, page)
        }
    };

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
                    axios.delete(`${baseUrl}/api/group/softdelete/${id}`,
                        { headers: { "Authorization": `Bearer ${token}` } })
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            )
                            getAllAsync(currentPage);
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
        getAllAsync(currentPage);
    }, [])

    return (
        <div className='area'>
            < div className="d-flex justify-content-between">
                {userRole.includes("Admin") ?
                    <Tooltip title='Add' arrow placement="top-start">
                        <NavLink to='/groups/create'>
                            <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                        </NavLink>
                    </Tooltip>
                    : null
                }
                <TextField onChange={(e) => getSearchResultDatasAsync(e.target.value, pages.currentPage)} id="outlined-basic" className='d-lg-block d-md-block d-none' label="Search..." variant="outlined" />
            </div>
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
                                            count++
                                            return <TableRow key={i}>
                                                <TableCell>{count}</TableCell>
                                                <TableCell>{group.name}</TableCell>
                                                <TableCell>
                                                    {
                                                        group.teachersInfo !== null &&(
                                                            group.teachersInfo.map(function (teacher, i) {
                                                                return <span key={i}>{teacher.fullName.concat(" ")}</span>
                                                            })
                                                        )
                                                       
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    <div className="actions">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/groups/detail/${group.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} />
                                                                </NavLink>
                                                            </MenuItem>
                                                        </Tooltip>

                                                        {userRole.includes("Admin") ?
                                                            <>
                                                                <Tooltip title='Edit' placement='top-start'>
                                                                    <MenuItem>
                                                                        <NavLink to={`/groups/edit/${group.id}`}>
                                                                            <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} />
                                                                        </NavLink>
                                                                    </MenuItem>
                                                                </Tooltip>
                                                                <Tooltip title='Delete' placement='top-start'>
                                                                    <Button type="button" onClick={(id) => remove(group.id)}>
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
                            <Stack spacing={2}>
                                <Pagination onChange={handleChange} count={totalPage} page={currentPage} size='large' />
                            </Stack>
                        </TableContainer>
                    </Paper>
                )
            }

        </div >
    )
}

export default Group
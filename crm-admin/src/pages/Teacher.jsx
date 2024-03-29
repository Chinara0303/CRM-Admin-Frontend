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

function Teacher() {
   const baseUrl = "https://localhost:7069";

    const token = JSON.parse(localStorage.getItem('user-info'));
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userRole = decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
    
    const [showTable, setShowTable] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState(undefined);
    const [totalPage, setTotalPage] = useState(1);
    const [filterValue, setFilterValue] = useState('ascending');
    let take = 3;
    let count = (pages.currentPage - 1) * take;


    const getAllAsync = async (page) => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getall?skip=${page}&take=${take}`)
                .then((res) => {
                    setPages(res.data)
                    if (res.data.datas.length > 0) {
                        setShowTable(true);
                        setTeachers(res.data.datas);
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

    const handleChange = (e, page) => {
        if (searchValue === undefined) {
            setCurrentPage(page);
            getAllAsync(page)
        }
        if (searchValue !== undefined) {
            setCurrentPage(page);
            getSearchDatasAsync(searchValue, page)
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
                    axios.delete(`${baseUrl}/api/teacher/softdelete/${id}`)
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

    const getSearchDatasAsync = async (searchText, page) => {
        setSearchValue(searchText);
        try {
            await axios.post(`${baseUrl}/api/teacher/search?searchText=${searchText}&skip=${page}&take=${take}`)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.datas.length > 0) {
                        setTeachers(res.data.datas);
                        setTotalPage(res.data.totalPage)
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

    const getFilteredDatasAsync = async (page) => {
        try {
            await axios.post(`${baseUrl}/api/teacher/filter?filterValue=${filterValue}&skip=${page}&take=${take}`)
                .then((res) => {
                    if (res.data.datas.length > 0) {
                        setTeachers(res.data.datas);
                        setTotalPage(res.data.totalPage)
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
        getAllAsync(currentPage);
    }, [])

    return (
        <div className='area'>
            <div className="d-flex justify-content-between">
                {userRole.includes("Admin") || userRole.includes("AffairCoordinator") ?
                    <Tooltip title='Add' arrow placement="top-start">
                        <NavLink to='/teachers/create'>
                            <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                        </NavLink>
                    </Tooltip>
                    : null
                }
                <TextField onChange={(e) => getSearchDatasAsync(e.target.value, pages.currentPage)} autoComplete='off' id="outlined-basic" className='d-lg-block d-md-block d-none' label="Search..." variant="outlined" />
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
                                        <TableCell style={{ display: "flex" }}>
                                            <div onClick={() => getFilteredDatasAsync(pages.currentPage, setFilterValue(filterValue === 'ascending' ? "descending" : "ascending"))} className="arrow-down-up mx-2">
                                                <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                                                </svg>
                                            </div>
                                            Age
                                        </TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        teachers.map(function (teacher, i) {
                                            count++
                                            return <TableRow key={i}>
                                                <TableCell>{count}</TableCell>
                                                <TableCell>
                                                    <div className="image-area">
                                                        <img src={`data:image/png;base64,${teacher.image}`} />
                                                    </div>
                                                </TableCell>
                                                <TableCell>{teacher.fullName}</TableCell>
                                                <TableCell>{teacher.age}</TableCell>
                                                <TableCell>
                                                    <div className="actions">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/teachers/detail/${teacher.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} /></NavLink>
                                                            </MenuItem>
                                                        </Tooltip>

                                                        {userRole.includes("Admin") ?
                                                            <>
                                                                <Tooltip title='Edit' placement='top-start'>
                                                                    <MenuItem>
                                                                        <NavLink to={`/teachers/edit/${teacher.id}`}><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                                                                    </MenuItem>
                                                                </Tooltip>
                                                                <Tooltip title='Delete' placement='top-start'>
                                                                    <Button type="button" onClick={(id) => remove(teacher.id)}><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
                                                                </Tooltip>
                                                            </>
                                                            :null
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

        </div>
    )
}

export default Teacher
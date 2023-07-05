import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleCheck, faCircleInfo, faCircleXmark, faSquarePlus, faTrashCan, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Menu, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Staff() {
    const baseUrl = "https://localhost:7069";

    const [showTable, setShowTable] = useState(false);
    const [staff, setStaff] = useState([]);
    const [filterValue, setFilterValue] = useState("ascending");
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [icon, setIcon] = useState(faCircleXmark);
    const [userId, setUserId] = useState("");

    let take = 3;
    let count = (pages.currentPage - 1) * take;

    const getAllAsync = async (page) => {
        try {
            await axios.get(`${baseUrl}/api/account/getusers?skip=${page}&take=${take}`)
                .then((res) => {
                    setPages(res.data)
                    if (res.data.datas.length > 0) {
                        setShowTable(true);
                        setStaff(res.data.datas)
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
                    axios.delete(`${baseUrl}/api/account/usersoftdelete/${id}`)
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

    const getSearchResultDatasAsync = async (searchText, page) => {
        setSearchValue(searchText)
        try {
            await axios.post(`${baseUrl}/api/account/search?searchText=${searchText}&skip=${page}&take=${take}`)
                .then((res) => {
                    if (res.data.datas.length > 0) {
                        setStaff(res.data.datas);
                        setTotalPage(res.data.totalPage);
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

    const getFilteredDatasAsync = async (page, filterValue) => {
        try {
            await axios.post(`${baseUrl}/api/account/filter?filterValue=${filterValue}&skip=${page}&take=${take}`)
                .then((res) => {
                    if (res.data.datas.length > 0) {
                        setStaff(res.data.datas);
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

    const handleChange = (e, page) => {

        if (searchValue === "") {
            setCurrentPage(page);
            getAllAsync(page)
        }
        // if (filterValue === "ascending" || filterValue === "descending") {
        //     setCurrentPage(page);
        //     getFilteredDatasAsync(page, filterValue)
        // }
        if (searchValue !== "") {
            setCurrentPage(page);
            getSearchResultDatasAsync(searchValue, page)
        }
    };

    const handleStatusChange = async (userId) => {
        setUserId(userId)
        try {
            await axios.put(`${baseUrl}/api/account/setStatus/${userId}`)
                .then((res) => {
                    debugger
                    if(userId == res.data.userId){
                        debugger
                        if (res.data.isActive) {
                            setIcon(faCircleCheck);
                        }
                        else {
                            setIcon(faCircleXmark)
                        }
                    }
                
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllAsync(currentPage);
    }, [])

    return (
        <div className='area'>
            <div className="d-flex justify-content-between">
                <Tooltip title='Add' arrow placement="top-start">
                    <NavLink to='/staff/create'>
                        <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
                    </NavLink>
                </Tooltip>
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
                                        <TableCell>Image</TableCell>
                                        <TableCell>Full name</TableCell>
                                        <TableCell style={{ display: "flex", justifyContent: "center" }}>
                                            <Tooltip title='Age' arrow placement="top-start">
                                                <div onClick={() => getFilteredDatasAsync(pages.currentPage, setFilterValue(filterValue === "ascending" ? "descending" : "ascending"))} className="arrow-down-up mx-2">
                                                    <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                                                    </svg>
                                                </div>
                                            </Tooltip>
                                            Age
                                        </TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        staff.map(function (employee, i) {
                                            count++
                                            return <TableRow key={i}>
                                                <TableCell>{count}</TableCell>
                                                <TableCell>
                                                    <div className="image-area">
                                                        <img src={`data:image/;base64,${employee.image}`} />
                                                    </div>
                                                </TableCell>
                                                <TableCell>{employee.fullName}</TableCell>
                                                <TableCell>{employee.age}</TableCell>
                                                <TableCell>
                                                    {
                                                        <div className="statuses" onClick={(userId) => handleStatusChange(employee.id)}>
                                                            <FontAwesomeIcon icon={icon} size="2xl" style={{ color: "#d10000", cursor: "pointer" }} />
                                                        </div>

                                                        // <FontAwesomeIcon icon={faCircleCheck} size="2xl" style={{color: "#37ae04",cursor:"pointer"}} />
                                                    }

                                                </TableCell>
                                                <TableCell>
                                                    <div className="actions">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/staff/detail/${employee.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="xl" style={{ color: "#d0fa00", }} />
                                                                </NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        <Tooltip title='Delete' placement='top-start'>
                                                            <Button type='button' onClick={(id) => remove(employee.id)}>
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

export default Staff
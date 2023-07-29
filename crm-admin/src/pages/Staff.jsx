import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo, faCircleXmark, faPenToSquare, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Button, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Staff() {
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const token = JSON.parse(localStorage.getItem('user-info'));
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userRole = decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;

    const [showTable, setShowTable] = useState(false);
    const [staff, setStaff] = useState([]);
    const [filterValue, setFilterValue] = useState("ascending");
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

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
                    axios.delete(`${baseUrl}/api/account/usersoftdelete/${id}`,
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

    const getSearchResultDatasAsync = async (searchText, page) => {
        setSearchValue(searchText)
        try {
            await axios.post(`${baseUrl}/api/account/search?searchText=${searchText}&skip=${page}&take=${take}`)
                .then((res) => {
                    console.log(res.data)
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
        if (searchValue !== "") {
            setCurrentPage(page);
            getSearchResultDatasAsync(searchValue, page)
        }
    };

    const handleStatusChange = async (userId) => {
        try {
            await axios.put(`${baseUrl}/api/account/setstatus/${userId}`,)
                .then((res) => {
                    if (res.status === 200) {
                        setStaff((prevStaff) =>
                            prevStaff.map((employee) =>
                                employee.id === userId
                                    ? { ...employee, status: !employee.status }
                                    : employee
                            ),
                        );
                    }
                })

        } catch (error) {
        }
    }

    useEffect(() => {
        getAllAsync(currentPage);
    }, [])

    return (
        <div className='area'>
            < div className="d-flex justify-content-between">
                {
                    userRole.includes("Admin") ?
                        <Tooltip title='Add' arrow placement="top-start">
                            <NavLink to='/staff/create'>
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
                                        {
                                            userRole.includes("Admin") ?
                                                <TableCell>Status</TableCell> : null

                                        }

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
                                                {
                                                    userRole.includes("Admin") ?
                                                        <TableCell><div className="statuses" onClick={() => handleStatusChange(employee.id)}>
                                                            <FontAwesomeIcon
                                                                icon={employee.status ? faCircleCheck : faCircleXmark}
                                                                size="xl"
                                                                style={{ color: employee.status ? 'green' : 'red', cursor: 'pointer' }}
                                                            />
                                                        </div>
                                                        </TableCell>
                                                        : null
                                                }

                                                <TableCell>
                                                    <div className="actions">
                                                        <Tooltip title='Info' placement='top-start'>
                                                            <MenuItem>
                                                                <NavLink to={`/staff/detail/${employee.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} />
                                                                </NavLink>
                                                            </MenuItem>
                                                        </Tooltip>
                                                        {
                                                            userRole.includes("Admin") ?
                                                            <>
                                                            <Tooltip title='Edit' placement='top-start'>
                                                                <MenuItem>
                                                                    <NavLink to={`/staff/edit/${employee.id}`}>
                                                                        <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} />
                                                                    </NavLink>
                                                                </MenuItem>
                                                            </Tooltip>
                                                            <Tooltip title='Delete' placement='top-start'>
                                                                <Button type='button' onClick={() => remove(employee.id)}>
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

export default Staff
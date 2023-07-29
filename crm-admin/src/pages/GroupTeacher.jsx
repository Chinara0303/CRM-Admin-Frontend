import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';


function GroupTeacher() {
    const [showTable, setShowTable] = useState(false);
    const [groups, setGroups] = useState([]);
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState(undefined);
    const [totalPage, setTotalPage] = useState(1);
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
                        setGroups(res.data.datas);
                        setTotalPage(res.data.totalPage)
                    }
                    else {
                        setShowTable(false)
                    }
                });
        }

        catch (error) {
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
                    if (res.data.datas.length > 0) {
                        setGroups(res.data.datas);
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

    const handleChange = (e, page) => {
        if (searchValue === undefined) {
            setCurrentPage(page);
            getAllAsync(page)
        }
        if (searchValue !== undefined) {
            setCurrentPage(page);
            getSearchResultDatasAsync(searchValue, page)
        }
    };

    useEffect(() => {
        getAllAsync(currentPage);
    }, [])

    return (
        <div className='area'>
            < div className="d-flex justify-content-between">
                {userRole.includes("Admin") ?
                    <Tooltip title='Add' arrow placement="top-start">
                        <NavLink to='/groupteacher/create'>
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
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Group name</TableCell>
                                        <TableCell>Teacher image</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        groups.map(function (group, i) {
                                            count++
                                            return <TableRow key={i}>
                                                <TableCell>{count}</TableCell>
                                                <TableCell>
                                                    <div className="group-name">
                                                        <span>{group.name} </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell style={{ display: "flex", justifyContent: "center" }}>
                                                    {
                                                        group.teachersInfo.map(function (teacher, i) {
                                                            return <div className="img-area">
                                                                <img className='img-fluid' src={`data:image/png;base64,${teacher.image}`} alt="" />
                                                            </div>
                                                        })
                                                    }

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

export default GroupTeacher
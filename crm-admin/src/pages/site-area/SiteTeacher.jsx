import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Menu, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useState } from 'react';

function SiteTeacher() {

    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";

    const [showTable, setShowTable] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchValue, setSearchValue] = useState(undefined);


    let take = 3;
    let count = (pages.currentPage - 1) * take;

    const getAllAsync = async (page) => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getall?skip=${page}&take=${take}`)
                .then((res) => {
                    setPages(res.data)

                    if (res.data.datas.length > 0) {
                        setShowTable(true);
                        setTeachers(res.data.datas)
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
    const getSearchDatasAsync = async (searchText, page) => {
        setSearchValue(searchText);
        try {
            await axios.post(`${baseUrl}/api/teacher/search?searchText=${searchText}&skip=${page}&take=${take}`)
                .then((res) => {

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

    const handleChange = (e, page) => {
        setCurrentPage(page)
        if(searchValue !== undefined){
            getSearchDatasAsync(searchValue,page)
        }
        else{
            getAllAsync(page)
        }
    };

    useEffect(() => {
        getAllAsync(currentPage);
    }, [])

    return (
        <div className='area'>
            <TextField onChange={(e) => getSearchDatasAsync(e.target.value, pages.currentPage)} id="outlined-basic" label="Search..." variant="outlined" />
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
                                            count++
                                            return <TableRow>
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
                                                                <NavLink to={`/site/teachers/detail/${teacher.id}`}>
                                                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} /></NavLink>
                                                            </MenuItem>
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

export default SiteTeacher
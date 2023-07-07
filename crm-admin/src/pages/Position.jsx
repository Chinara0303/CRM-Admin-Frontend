import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrashCan, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Position() {
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";

    const [showTable, setShowTable] = useState(false);
    const [positions, setPositions] = useState([]);
    const [filterValue, setFilterValue] = useState("ascending");
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState(undefined);
    const [totalPage, setTotalPage] = useState(1);

    let take = 3;
    let count = (pages.currentPage - 1) * take;


    const getAllAsync = async (page) => {
        try {
            await axios.get(`${baseUrl}/api/account/getroles?skip=${page}&take=${take}`)
                .then((res) => {
                    setPages(res.data)
                    if (res.data.datas.length > 0) {
                        setShowTable(true);
                        setPositions(res.data.datas)
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
    
    const getFilteredDatasAsync = async () => {
        try {
            await axios.post(`${baseUrl}/api/position/filter?filterValue=${filterValue}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setPositions(res.data);
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
        // if (searchValue === undefined && filterValue === undefined) {
            setCurrentPage(page);
            getAllAsync(page)
    // }
        // if (searchValue !== undefined) {
        //     setCurrentPage(page);
        //     getSearchDatasAsync(searchValue, page)
        // }
    };
    useEffect(() => {
        getAllAsync(currentPage);
    }, [])

    return (
        <div className='area'>
            {
                showTable && (
                    <Paper style={{ marginTop: "30px" }}>
                        <TableContainer>
                            <Table>
                                <TableHead >
                                    <TableRow >
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>
                                            Staff count
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        positions.map(function (position, i) {
                                            count++
                                            return <TableRow key={i}>
                                                <TableCell>{count}</TableCell>
                                                <TableCell>{position.name}</TableCell>
                                                <TableCell>{position.usersCount}</TableCell>
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

export default Position
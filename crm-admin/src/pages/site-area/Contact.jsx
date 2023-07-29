import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
function Contact() {
    const [contact, setContact] = useState([])
    const [education, setEducation] = useState([])
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
    let count = 1;

    const getAllAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/contact/getall`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setContact(res.data)
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


    useEffect(() => {
        getAllAsync();
    }, [])


    return (
        <div className='area'>
            {
                <Paper style={{ marginTop: "30px" }}>
                    <TableContainer>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>FullName</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Message</TableCell>
                                    <TableCell>Education</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    contact.map(function (item, i) {
                                        return <TableRow key={i}>
                                            <TableCell>{count++}</TableCell>
                                            <TableCell>{item.fullName}</TableCell>
                                            <TableCell>{item.phone}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.message}</TableCell>
                                            <TableCell>{item.educationName}</TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            }

        </div>
    )
}

export default Contact
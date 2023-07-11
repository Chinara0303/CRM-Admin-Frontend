import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button, debounce } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function Seans() {
  const [showTable, setShowTable] = useState(false);
  const [seanses, setSeanses] = useState([]);

  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
  let count = 1;


  const token = JSON.parse(localStorage.getItem('user-info'));
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userRole = decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;

  const getAllAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/seans/getall`)
        .then((res) => {
          if (res.data.length <= 0) {
            setShowTable(false)
          }
          if (res.data.length > 0) {
            setShowTable(true);
            setSeanses(res.data)
          }
          if (res.data.length >= 3) {
            setSeanses(res.data)
          }
          else if (res.data.length < 3) {
            setSeanses(res.data)
          }
        }
        );

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
        showTable && (
          <Paper style={{ marginTop: "30px" }}>
            <TableContainer>
              <Table>
                <TableHead >
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    seanses.map(function (seans, i) {
                      return <TableRow key={i}>
                        <TableCell>{count++}</TableCell>
                        <TableCell>{seans.name}</TableCell>
                        <TableCell>
                          <div className="actions">
                            {userRole.includes("Admin") ?
                              <Tooltip title='Edit' placement='top-start'>
                                <MenuItem>
                                  <NavLink to={`/seanses/edit/${seans.id}`}>
                                    <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                                </MenuItem>
                              </Tooltip>
                              : null
                            }

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

export default Seans
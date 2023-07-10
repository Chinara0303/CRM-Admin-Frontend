import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Room() {
  const [showTable, setShowTable] = useState(false);
  const [rooms, setRooms] = useState([]);
  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
  let count = 1;

  const getAllAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/room/getall`)
        .then((res) => {
          if (res.data.length > 0) {
            setShowTable(true);
            setRooms(res.data)
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
          axios.delete(`${baseUrl}/api/room/softdelete/${id}`)
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
        <NavLink to='/rooms/create'>
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
                    <TableCell>Capacity</TableCell>
                    <TableCell>Group Count</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    rooms.map(function (room, i) {
                      return <TableRow key={i}>
                        <TableCell>{count++}</TableCell>
                        <TableCell>{room.name}</TableCell>
                        <TableCell>{room.capacity}</TableCell>
                        <TableCell>{room.groupCount}</TableCell>
                        <TableCell>
                          <div className="actions">
                            <Tooltip title='Info' placement='top-start'>
                              <MenuItem>
                                <NavLink to={`/rooms/detail/${room.id}`}>
                                  <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} />
                                </NavLink>
                              </MenuItem>
                            </Tooltip>
                            <Tooltip title='Edit' placement='top-start'>
                              <MenuItem>
                                <NavLink to={`/rooms/edit/${room.id}`}>
                                  <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} />
                                </NavLink>
                              </MenuItem>
                            </Tooltip>
                            <Tooltip title='Delete' placement='top-start'>
                              <Button type="submit" onClick={(id) => remove(room.id)}>
                                <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} />
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
  );
}
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showTable, setShowTable] = useState(false);
  const [seanses, setSeanses] = useState([]);
  const [showCreateArea, setShowCreateArea] = useState(true);

  const baseUrl = "https://localhost:7069";
  let count = 1;

  const getAllAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/seans/getall`)
        .then((res) => {
          if(res.data.length <= 0){
            setShowTable(false)
            setShowCreateArea(true)
          }
          if (res.data.length > 0) {
            debugger
            setShowTable(true);
            setSeanses(res.data)
          }
          if (res.data.length >= 3) {
            setShowCreateArea(false)
            setSeanses(res.data)
          }
          else if(res.data.length < 3){
            setShowCreateArea(true)
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
          axios.delete(`${baseUrl}/api/seans/softdelete/${id}`)
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
      {
        showCreateArea && (
          <Tooltip title='Add' arrow placement="top-start">
            <NavLink to='/seanses/create'>
              <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
            </NavLink>
          </Tooltip>
        )
      }

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
                          <div className="d-flex">
                            <Tooltip title='Edit' placement='top-start'>
                              <MenuItem>
                                <NavLink to={`/seanses/edit/${seans.id}`}><FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#2ab404", }} /></NavLink>
                              </MenuItem>
                            </Tooltip>
                            <Tooltip title='Delete' placement='top-start'>
                              <Button type="button" onClick={(id) => remove(seans.id)}>
                                <FontAwesomeIcon icon={faTrashCan} size="xl" style={{ color: "#f50000", }} />
                              </Button>
                            </Tooltip>
                          </div>
                          {/* <Button
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        >
                          <FontAwesomeIcon icon={faAlignRight} size='xl' style={{ color: "#174873" }} />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <Tooltip title='Edit' placement='top-start'>
                            <MenuItem>
                              <NavLink to='/seanses/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                            </MenuItem>
                          </Tooltip>
                          <Tooltip title='Delete' placement='top-start'>
                            <MenuItem>
                              <Button><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
                            </MenuItem>
                          </Tooltip>
                        </Menu> */}
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
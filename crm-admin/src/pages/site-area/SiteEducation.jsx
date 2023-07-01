import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, Input, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function SiteEducation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [showTable, setShowTable] = useState(false);
  const [educations, setEducations] = useState([]);
  const baseUrl = "https://localhost:7069";
  let count = 1;

  const getAllAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/education/getall`)
        .then((res) => {
          if (res.data.length > 0) {
            setShowTable(true);
            setEducations(res.data)
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
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Group count</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    educations.map(function (education, i) {
                      return <TableRow>
                        <TableCell>{count++}</TableCell>
                        <TableCell>
                          <div className="image-area">
                            <img src={`data:image/png;base64,${education.image}`} />
                          </div>
                        </TableCell>
                        <TableCell>{education.name}</TableCell>
                        <TableCell>{education.groupCount}</TableCell>
                        <TableCell>
                          <div className="d-flex">
                            <Tooltip title='Info' placement='top-start'>
                              <MenuItem>
                                <NavLink to={`/site/educations/detail/${education.id}`}>
                                  <FontAwesomeIcon icon={faCircleInfo} size="xl" style={{ color: "#d0fa00", }} />
                                </NavLink>
                              </MenuItem>
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
                                                  <Tooltip title='Info' placement='top-start'>
                                                      <MenuItem>
                                                          <NavLink to='/educations/detail/id'><FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} /></NavLink>
                                                      </MenuItem>
                                                  </Tooltip>
                                                  <Tooltip title='Edit' placement='top-start'>
                                                      <MenuItem>
                                                          <NavLink to='/educations/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
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

export default SiteEducation
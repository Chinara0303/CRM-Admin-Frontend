import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SiteSlider() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showTable, setShowTable] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [sliders, setSliders] = useState([]);
  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
  let count = 1;

  const getAllAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/slider/getall`)
        .then((res) => {
          if (res.data.length > 0) {
            setShowTable(true)
            setSliders(res.data)
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
      console.log(error);
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
          axios.delete(`${baseUrl}/api/slider/delete/${id}`)
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
        <NavLink to='/site/sliders/create'>
          <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
        </NavLink>
      </Tooltip>
      {showTable && (
        <Paper style={{ marginTop: "30px" }}>
          <TableContainer>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  sliders.map(function (slider, i) {
                    return <TableRow key={i}>
                      <TableCell>{count++}</TableCell>
                      <TableCell>
                        <div className="image-area">
                          <img src={`data:image;base64,${slider.image}`} />
                        </div>
                      </TableCell>
                      <TableCell>{slider.title}</TableCell>
                      <TableCell>{slider.description}</TableCell>

                      <TableCell>
                        <div className='d-flex'>
                          <Tooltip title='Edit' placement='top-start'>
                            <MenuItem>
                              <NavLink to={`/site/sliders/edit/${slider.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} />
                              </NavLink>
                            </MenuItem>
                          </Tooltip>
                          <Tooltip title='Delete' placement='top-start'>
                            <Button type="button" onClick={(id) => remove(slider.id)}>
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
      )}


    </div>
  );
}

export default SiteSlider

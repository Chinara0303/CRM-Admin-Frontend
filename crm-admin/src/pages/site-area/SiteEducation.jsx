import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function SiteEducation() {

  const [showTable, setShowTable] = useState(false);
  const [educations, setEducations] = useState([]);
  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
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
                          <div className="actions">
                            <Tooltip title='Info' placement='top-start'>
                              <MenuItem>
                                <NavLink to={`/site/educations/detail/${education.id}`}>
                                  <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} />
                                </NavLink>
                              </MenuItem>
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
  )
}

export default SiteEducation
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, } from '@fortawesome/free-regular-svg-icons';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';


function SiteSetting() {
  const [setting, setSetting] = useState([]);
  const baseUrl = "https://localhost:7069";
  let count = 1;

  const getAllAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/setting/getall`)
        .then((res) => {
          console.log(res.data)
          if (res.data.length > 0) {
            setSetting(res.data)
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
      <Paper style={{ marginTop: "30px" }}>
        <TableContainer>
          <Table>
            <TableHead >
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                setting.map(function (item, i) {
                 return <TableRow key={i}>
                    <TableCell>{count++}</TableCell>
                    <TableCell>{item.key}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>
                      <Tooltip title='Edit' placement='top-start'>
                        <NavLink to={`/site/setting/edit/${item.id}`}><FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#2ab404", }} /></NavLink>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                })
              }

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default SiteSetting
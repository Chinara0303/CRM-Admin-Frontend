import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from '@mui/material';

function Weekday() {
  return (
    <div className='area'>
      <Tooltip title='Add' arrow placement="top-start">
        <NavLink to='/weekdays/create'>
          <FontAwesomeIcon icon={faSquarePlus} size="2xl" style={{ color: "#069a04", }} />
        </NavLink>
      </Tooltip>
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
              <TableRow>
                <TableCell>Capacity</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>
                    <Tooltip title='Edit' placement='top-start'>
                      <MenuItem>
                        <NavLink to='/weekdays/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#2ab404", }} /></NavLink>
                      </MenuItem>
                    </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default Weekday
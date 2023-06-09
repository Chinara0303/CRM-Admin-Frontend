import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, } from '@fortawesome/free-regular-svg-icons';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';


function SiteSetting() {
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Keyname</TableCell>
              <TableCell>Valuename</TableCell>
              <TableCell>
                  <Tooltip title='Edit' placement='top-start'>
                      <NavLink to='/site/settings/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#2ab404", }} /></NavLink>
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

export default SiteSetting
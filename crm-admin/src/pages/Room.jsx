import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Menu, Button } from '@mui/material';

export default function Room() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='area'>
      <Tooltip title='Add' arrow placement="top-start">
        <NavLink to='/rooms/create'>
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
                <TableCell>Capacity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Capacity</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <FontAwesomeIcon icon={faAlignRight} size='xl' style={{color:"#174873"}} />
                  </Button>
                  <Menu 
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    {/* <Tooltip title='Info' placement='top-start'>
                      <MenuItem>
                        <NavLink to='/rooms/detail/2'><FontAwesomeIcon icon={faCircleInfo} size="lg" style={{color: "#d0fa00",}} /></NavLink>
                      </MenuItem>
                    </Tooltip> */}
                    <Tooltip title='Edit' placement='top-start'>
                      <MenuItem>
                        <NavLink to='/rooms/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                      </MenuItem>
                    </Tooltip>
                    <Tooltip title='Delete' placement='top-start'>
                      <MenuItem>
                        <Button><FontAwesomeIcon icon={faTrashCan} size="lg" style={{color: "#f50000",}} /></Button>
                      </MenuItem>
                    </Tooltip>
                  </Menu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Capacity</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>
                  <Button
                    id="basic-button"
                    aria-controls={open ? '2' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <FontAwesomeIcon icon={faAlignRight} size='xl' style={{color:"#174873"}} />
                  </Button>
                  <Menu 
                    id="2"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    {/* <Tooltip title='Info' placement='top-start'>
                      <MenuItem>
                        <NavLink to='/rooms/detail/2'><FontAwesomeIcon icon={faCircleInfo} size="lg" style={{color: "#d0fa00",}} /></NavLink>
                      </MenuItem>
                    </Tooltip> */}
                    <Tooltip title='Edit' placement='top-start'>
                      <MenuItem>
                        <NavLink to='/rooms/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                      </MenuItem>
                    </Tooltip>
                    <Tooltip title='Delete' placement='top-start'>
                      <MenuItem>
                        <Button><FontAwesomeIcon icon={faTrashCan} size="lg" style={{color: "#f50000",}} /></Button>
                      </MenuItem>
                    </Tooltip>
                  </Menu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
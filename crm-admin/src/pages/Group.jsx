import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faCircleInfo, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';

function Group() {
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
        <NavLink to='/groups/create'>
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
                        <TableCell>Teacher full name</TableCell>
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
                                        <NavLink to='/groups/detail/id'><FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#d0fa00", }} /></NavLink>
                                    </MenuItem>
                                </Tooltip>
                                <Tooltip title='Edit' placement='top-start'>
                                    <MenuItem>
                                        <NavLink to='/groups/edit/id'><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#2ab404", }} /></NavLink>
                                    </MenuItem>
                                </Tooltip>
                                <Tooltip title='Delete' placement='top-start'>
                                    <MenuItem>
                                        <Button><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
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
  )
}

export default Group
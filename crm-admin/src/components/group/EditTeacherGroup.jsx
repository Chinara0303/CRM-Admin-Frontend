import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Box, Chip, InputLabel, Paper, Select, Tooltip, useTheme, MenuItem, OutlinedInput, FormControl, Button } from '@mui/material'
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const groupnames = [
    'Oliver Hansen',
    'Elekber Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const teachernames = [
    'Chinara Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function EditTeacherGroup() {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [groupName, setGroupName] = useState([]);

    const handleGroupChange = (event) => {
        const {
            target: { value },
        } = event;
        setGroupName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleTeacherChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <div className='edit-area area'>
            <Paper style={{ marginTop: "30px" }}>
                <div className="position-name">
                    <h4>test</h4>
                </div>
                <div className="imgs d-flex">
                    <div className="img-area">
                        <img className='img-fluid' src={require('../../assets/images/download.jpeg')} alt="" />
                        <div className="remove-area">
                            <Button className='remove-icon'><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
                        </div>
                    </div>
                    <div className="img-area">
                        <img className='img-fluid' src={require('../../assets/images/download.jpeg')} alt="" />
                        <div className="remove-area">
                            <Button className='remove-icon'><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
                        </div>
                    </div>
                    <div className="img-area">
                        <img className='img-fluid' src={require('../../assets/images/download.jpeg')} alt="" />
                        <div className="remove-area">
                            <Button className='remove-icon'><FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#f50000", }} /></Button>
                        </div>
                    </div>
                </div>
                <Form>
                    <div className="forms">
                        <FormGroup >
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Group</InputLabel>
                                <Select
                                    className='ul-list'
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    value={groupName}
                                    onChange={handleGroupChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {groupnames.map((name) => (
                                        <MenuItem
                                            className='menu-item'
                                            key={name}
                                            value={name}
                                            style={getStyles(name, groupName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormGroup>
                        <FormGroup >
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Teacher</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleTeacherChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {teachernames.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormGroup>
                    </div>
                    <Tooltip title='Go to list' arrow placement="bottom-start">
                        <NavLink to='/groupteacher'>
                            <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                        </NavLink>
                    </Tooltip>
                    <Tooltip title='add' arrow placement="bottom-start">
                        <Button type='submit' style={{ border: "none" }} >
                            <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#0ae60d", }} />
                        </Button>
                    </Tooltip>
                </Form>
            </Paper>
        </div>
    )
}

export default EditTeacherGroup
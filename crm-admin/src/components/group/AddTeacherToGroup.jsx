import React, { useState } from 'react'
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Chip, Container, Grid, InputLabel, Paper, Select, Tooltip, useTheme, MenuItem, OutlinedInput, FormControl, FormLabel, Autocomplete } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
// import Close from '@mui/icons-material/Close';
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import SelectInput from '@mui/material/Select/SelectInput'

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

function AddTeacherToGroup() {
    const baseUrl = "https://localhost:7069";
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const navigate = useNavigate();
    const [groupId, setGroupId] = useState(0);
    const [teacherIds, setTeacherIds] = useState([]);
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const newTeacherGroup = { groupId: groupId, teacherIds: teacherIds };

    const getGroupsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/group/getall`)
                .then((res) => {
                    console.log(res.data);
                    // if (res.data.length > 0) {
                    setGroups(res.data)
                    // }
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

    const getTeachersAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getall`)
                .then((res) => {
                    // if (res.data.length > 0) {
                    setTeachers(res.data)
                    // }
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newTeacherGroup)) {
            if (key === 'teacherIds') {
                value.forEach((val, index) => {
                    formData.append(`teacherIds[${index}]`, val)
                })
                continue;
            }
            formData.append(key, value);
        };


        try {
            await axios.post(`${baseUrl}/api/teachergroup/create`, formData, {
                headers: {
                    Accept: "*/*",
                }
            })
                .then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Added a new item',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                })
                .then(() => {
                    navigate("/groupTeacher")
                })

        }
        catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    };

    useEffect(() => {
        getGroupsAsync();
        getTeachersAsync();
    }, [])

    const handleGroupChange = (e) => {
        setGroupId(e.target.value)
    }

    const handleTeacherChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
        setTeacherIds(selectedValues);
    }

    // const handleGroupChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setGroupName(
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };
    // const handleTeacherChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setPersonName(
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    return (
        <div className='create-area  mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Create</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <div className="forms mt-5 ">
                                <FormGroup className='mx-2 w-100'>
                                    <InputLabel style={{ marginTop: "20px" }} id="demo-simple-select-standard-label">Select the field</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standart-label"
                                        id="demo-simple-select-filled"
                                        fullWidth
                                        value={groupId}
                                        name="groupId"
                                        autoComplete="off"
                                        onChange={(e) => handleGroupChange(e)}>
                                        {
                                            groups.map(function (group, i) {
                                                return <MenuItem value={group.id} key={i}>{group.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {/* <InputGroup>
                                        <InputGroupText>Group</InputGroupText>
                                        <Input type="select" name='select' onChange={(e) => handleGroupChange(e)} >
                                            <option value="">Choose</option>
                                            {
                                                groups.map(function (group, i) {
                                                    return <option value={group.id} key={i}>{group.name}</option>
                                                })
                                            }
                                        </Input>
                                    </InputGroup> */}
                                </FormGroup>
                                {/* <Autocomplete
                                    multiple
                                    placeholder="Decorators"
                                    options={teachers}
                                /> */}
                                {/* <Autocomplete
                                        id="tags-default"
                                        multiple
                                        placeholder="Favorites"
                                        // options={teachers}
                                        // getOptionLabel={(option) => option.fullName}
                                        renderTags={(teachers, getTagProps) =>
                                            teachers.map((item, index) => (
                                                <Chip
                                                    variant="solid"
                                                    color="primary"
                                                    // endDecorator={<Close fontSize="sm" />}
                                                    {...getTagProps({ index })}
                                                >
                                                    {item.fullName}
                                                </Chip>
                                            ))
                                        }
                                    />
                                     */}
                                <InputGroup>
                                        <InputGroupText>Teachers</InputGroupText>
                                        <Input type="select" name='select' multiple onChange={(e) => handleTeacherChange(e)} >
                                            <option value="">Choose</option>
                                            {
                                                teachers.map(function (teacher, i) {
                                                    return <option value={teacher.id} key={i}>{teacher.fullName}</option>
                                                })
                                            }
                                        </Input>
                                    </InputGroup>
                                {/* <FormGroup >
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
                                                    style={getStyles(name, personName, theme)}
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
                                </FormGroup> */}
                            </div>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/groupteacher'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='add' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'><FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#0ae60d", }} /></Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default AddTeacherToGroup
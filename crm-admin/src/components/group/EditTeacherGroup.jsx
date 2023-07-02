import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Box, Chip, InputLabel, Paper, Select, Tooltip, useTheme, MenuItem, OutlinedInput, FormControl, Button } from '@mui/material'
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap'
import axios from 'axios';
import Swal from 'sweetalert2';


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// const groupnames = [
//     'Oliver Hansen',
//     'Elekber Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
// ];
// const teachernames = [
//     'Chinara Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
// ];


// function getStyles(name, personName, theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }


function EditTeacherGroup() {
    // const theme = useTheme();
    // const [personName, setPersonName] = useState([]);
    // const [groupName, setGroupName] = useState([]);

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

    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";

    const [groupId, setGroupId] = useState(0);
    const [teacherIds, setTeacherIds] = useState([]);
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [group, setGroup] = useState([]);

    const newTeacherGroup = {teacherIds: teacherIds };

    const getGroupsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/group/getall`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setGroups(res.data)
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

    const getTeachersAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/teacher/getall?skip=${0}&take=${0}`)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.datas.length > 0) {
                        setTeachers(res.data.datas)
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

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/group/getbyid/${id}`)
                .then((res) => {
                    setGroup(res.data);
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
            await axios.post(`${baseUrl}/api/teachergroup/update/${id}`, formData, {
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

    const handleTeacherChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
        setTeacherIds(selectedValues);
    }
    useEffect(() => {
        getGroupsAsync();
        getTeachersAsync();
        getAsync(id)
    }, [])

    return (
        <div className='edit-area area'>
            <Paper style={{ marginTop: "30px" }}>
                <div className="imgs d-flex">
                    {
                        // groups.teachers.map(function (teacherImage, i) {
                        //     debugger
                        //     return  <div key={i} className="img-area">
                        //         <img className='img-fluid' src={`data:image/png;base64,${teacherImage}`} alt="" />
                        //     </div>
                        // })

                        // group.teachers.map(function(teacher,i){
                        //     return <div key={i} className="img-area">
                        //     <img className='img-fluid' src={`data:image/png;base64,${teacher.image}`} alt="" />
                        // </div>
                        // })

                    }
                </div>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <div className="forms mt-5 ">
                        <FormGroup >
                            <InputGroup>
                                <InputGroupText>Teachers</InputGroupText>
                                <Input type="select" name='select' value={teacherIds} multiple onChange={(e) => handleTeacherChange(e)} >
                                    {
                                        teachers.map(function (teacher, i) {
                                            return <option value={teacher.id} key={i}>{teacher.fullName}</option>
                                        })
                                    }
                                </Input>
                            </InputGroup>
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
                {/* <Form>
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
                </Form> */}
            </Paper>
        </div>
    )
}

export default EditTeacherGroup
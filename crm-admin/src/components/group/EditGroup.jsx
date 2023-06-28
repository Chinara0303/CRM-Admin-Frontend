import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import Swal from 'sweetalert2'

function EditGroup() {

    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";

    const [rooms, setRooms] = useState([]);
    const [group, setGroup] = useState([]);
    const [roomId, setRoomId] = useState([]);

    const newGroup = { roomId: roomId };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/group/getbyid/${id}`)
                .then((res) => {
                    setGroup(res.data);
                    setRoomId(res.data.roomId);
                });

        } catch (error) {
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
    const getRoomsAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/room/getall`).then((res) => {
                if (res.data.length > 0) {
                    setRooms(res.data)
                }
            })
        }
        catch (error) {
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newGroup)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/group/update/${id}`, formData, {
                headers: {
                    Accept: "*/*"
                }
            }).then(() => {
                navigate("/groups")
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
    const handleRoomChange = (e) => {
        setRoomId(e.target.value);
    };

    useEffect(() => {
        getAsync(id);
        getRoomsAsync();
    }, [])

    return (
        <div className='edit-area area mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Room</InputGroupText>
                                    <Input type="select" name='select' value={roomId} onChange={(e) => handleRoomChange(e)} >
                                        {
                                            rooms.map(function (room, i) {
                                                return <option value={room.id} key={i}>{room.name}</option>
                                            })
                                        }
                                    </Input>
                                </InputGroup>
                            </FormGroup>

                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/groups'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='add' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'><FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} /></Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default EditGroup
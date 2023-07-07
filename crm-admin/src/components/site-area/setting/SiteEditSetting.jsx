import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText,Label } from 'reactstrap'
import Swal from 'sweetalert2'

function SiteEditSetting() {
    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";

    const [setting, setSetting] = useState();
    const [value, setValue] = useState();
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState([]);

    const newData = { value: value};

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/setting/getbyid/${id}`)
                .then((res) => {
                    setSetting(res.data);
                    setValue(res.data.value);
                });

        } catch (error) {
            console.log(error)

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

        for (const [key, value] of Object.entries(newData)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/setting/update/${id}`, formData, {
                headers: {
                    Accept: "*/*"
                }
            }).then(() => {
                navigate("/site/setting")
            })
        }
        catch (error) {
            const errors = error.response.data;
            if(errors.length > 0){
                setInvalid(true)
                setInvalidMessage(errors)
            }
        }

    };
    useEffect(() => {
        getAsync(id)
    }, [])

    return (
        <div className='edit-area'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper>
                        <Form onSubmit={(e)=>handleSubmit(e)}>
                        <FormGroup>
                                {
                                    invalid &&(
                                        <Alert severity="error">{invalidMessage}</Alert>
                                    )
                                }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Name</InputGroupText>
                                    <Input type='text' name="value" value={value} onChange={(e)=>setValue(e.target.value)}/>
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/site/setting'>
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

export default SiteEditSetting
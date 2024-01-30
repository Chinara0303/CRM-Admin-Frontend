import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditSeans() {

    const navigate = useNavigate();
    const { id } = useParams();
   const baseUrl = "https://localhost:7069";
    const [seans, setSeans] = useState([]);
    const [name, setName] = useState([]);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidNameMessage, setInvalidNameMessage] = useState("");
    const newSeans = { name: name };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/seans/getbyid/${id}`)
                .then((res) => {
                    setSeans(res.data);
                    setName(res.data.name);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newSeans)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/seans/update/${id}`, formData)
                .then(() => {
                    navigate("/seanses")
                })
        }
        catch (error) {
            const errors = error.response.data
             if (errors.length > 0) {
                if (errors.Name != undefined) {
                    if (errors.Name.length > 0) {
                      setInvalidName(true);
                      setInvalidNameMessage(errors.Name)
                    }
                  }
                setInvalidName(true);
                for (let i = 0; i < errors.length; i++) {
                    setInvalidNameMessage(errors[i])
                }
            }
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        getAsync(id)
    }, [])

    return (
        <div className='edit-area area'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container>
                    <Paper>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Name</InputGroupText>
                                    <Input type='text' name={name} invalid={invalidName} value={name} onChange={handleNameChange} />
                                    {
                                        invalidName && (
                                            <FormFeedback invalid>
                                                {invalidNameMessage}
                                            </FormFeedback>
                                        )
                                    }
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/seanses'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Tooltip title='Save' arrow placement="bottom-start">
                                <Button type='submit' style={{ border: "none" }} color='transparent'>
                                    <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} />
                                </Button>
                            </Tooltip>
                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default EditSeans
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'

function EditStaff() {
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
                        <Form>
                            <FormGroup>
                                <Input type='file' id='file' />
                                <Label className='btn-2' for='file'>Upload</Label>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <Input type='file' />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Full name</InputGroupText>
                                    <Input type='text' />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Email</InputGroupText>
                                    <Input type='email' />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Age</InputGroupText>
                                    <Input type='number' min='25' max='55' />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Addres</InputGroupText>
                                    <Input type='text' />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Bio</InputGroupText>
                                    <Input type='textarea' />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup >
                                <InputGroup>
                                    <InputGroupText>Position</InputGroupText>
                                    <Input name="select" type="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/staff'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>
                            <Button type='submit' style={{ border: "none" }} color='transparent'>
                                <Tooltip title='add' arrow placement="bottom-start">
                                    <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d", }} />
                                </Tooltip>
                            </Button>

                        </Form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default EditStaff
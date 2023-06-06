import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText } from 'reactstrap'

function AddWeekday() {
    return (
        <div className='create-area mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Create</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
                    <Paper>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Name</InputGroupText>
                                    <Input type='text' />
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/weekdays'>
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

export default AddWeekday
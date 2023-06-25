import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText,Label } from 'reactstrap'

function AddCourse() {
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
                        <Input type='file' id='file'/>
                        <Label className='btn-2' for='file'>Upload</Label>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>Name</InputGroupText>
                            <Input type='text' />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>Desciption</InputGroupText>
                            <Input type='textarea' />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>Price</InputGroupText>
                            <Input type='number' />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>Duration</InputGroupText>
                            <Input type='text' />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>Promises</InputGroupText>
                            <Input type='textarea' />
                        </InputGroup>
                    </FormGroup>
                    <Tooltip title='Go to list' arrow placement="bottom-start">
                        <NavLink to='/courses'>
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

export default AddCourse
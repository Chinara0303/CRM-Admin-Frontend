import { faChevronLeft, faPlus, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Container, Grid, Paper, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'
import axios from 'axios'

function AddRoom() {
  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('user-info'));

  const [invalidName, setInvalidName] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [invalidCapacity, setInvalidCapacity] = useState(false);
  const [invalidCapacityMessage, setInvalidCapacityMessage] = useState("");
  const [invalidNameMessage, setInvalidNameMessage] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const newRoom = { name: name, capacity: capacity };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(newRoom)) {
      formData.append(key, value);
    };

    try {
      await axios.post(`${baseUrl}/api/room/create`, formData,
        { headers: { "Authorization": `Bearer ${token}` } }
      )
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
          navigate("/rooms")
        })

    }
    catch (error) {
      const errors = error.response.data;
      if (errors.length > 0) {
        setInvalid(true)
        setInvalidMessage(errors)
      }
      if (errors.errors != undefined) {
        if (errors.errors.Capacity != undefined) {
          if (errors.errors.Capacity.length > 0) {
            setInvalidCapacity(true);
            setInvalidCapacityMessage(errors.errors.Capacity)
          }
        }
        if (errors.errors.Name != undefined) {
          if (errors.errors.Name.length > 0) {
            setInvalidName(true);
            setInvalidNameMessage(errors.errors.Name)
          }
        }
      }
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setInvalidName(false);
    setInvalid(false)
  };

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
    setInvalidCapacity(false);
    setInvalid(false);
  };

  return (
    <div className='create-area area mt-5'>
      <div className="title-area">
        <Paper>
          <h4>Create</h4>
        </Paper>
      </div>
      <Container maxWidth='lg'>
        <Grid container >
          <Paper>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <FormGroup>
                {
                  invalid && (
                    <Alert severity="error">{invalidMessage}</Alert>
                  )
                }
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Name</InputGroupText>
                  <Input type='text' invalid={invalidName} onChange={handleNameChange} />
                  {
                    invalidName && (
                      <FormFeedback invalid>
                        {invalidNameMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Capacity</InputGroupText>
                  <Input type='number' invalid={invalidCapacity} onChange={handleCapacityChange} />
                  {
                    invalidCapacity && (
                      <FormFeedback invalid>
                        {invalidCapacityMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <Tooltip title='Go to list' arrow placement="bottom-start">
                <NavLink to='/rooms'>
                  <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                </NavLink>
              </Tooltip>
              <Tooltip title='Add' arrow placement="bottom-start">
                <Button type='submit' style={{ border: "none" }} color='transparent'>
                  <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#0ae60d", }} />
                </Button>
              </Tooltip>
            </Form>
          </Paper>
        </Grid>
      </Container>

    </div>
  )
}

export default AddRoom

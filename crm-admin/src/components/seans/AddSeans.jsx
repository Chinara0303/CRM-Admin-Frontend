import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function AddSeans() {
  const baseUrl = "https://localhost:7069";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [invalidNameMessage, setInvalidNameMessage] = useState("");
  const [invalidName, setInvalidName] = useState(false)
  const newSeans = { name: name };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(newSeans)) {
      formData.append(key, value);
    };

    try {
      await axios.post(`${baseUrl}/api/seans/create`, formData, {
        headers: {
          Accept: "*/*"
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
          navigate("/seanses")
        })
    } catch (error) {
      const errors = error.response.data;
      if (errors.length > 0) {
        setInvalidName(true);
        for (let i = 0; i < errors.length; i++) {
         setInvalidNameMessage(errors[i])
        }
      }
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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
              <Tooltip title='Go to list' arrow placement="bottom-start">
                <NavLink to='/seanses'>
                  <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                </NavLink>
              </Tooltip>
              <Tooltip title='add' arrow placement="bottom-start">
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

export default AddSeans
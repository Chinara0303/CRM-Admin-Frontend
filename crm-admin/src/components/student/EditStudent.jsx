import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
 const baseUrl = "https://localhost:7069";
  const token = JSON.parse(localStorage.getItem('user-info'));

  const [invalidFullName, setInvalidFullName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidAge, setInvalidAge] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidBiography, setInvalidBiography] = useState(false);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
  const [invalidFullNameMessage, setInvalidFullNameMessage] = useState("");
  const [invalidPhoneMessage, setInvalidPhoneMessage] = useState("");
  const [invalidAgeMessage, setInvalidAgeMessage] = useState("");
  const [invalidAddressMessage, setInvalidAddressMessage] = useState("");
  const [invalidBiographyMessage, setInvalidBiographyMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [biography, setBiography] = useState("");
  const [file, setFile] = useState(null);
  const [groupId, setGroupId] = useState(0);
  const [groups, setGroups] = useState([]);
  const [image, setImage] = useState();
  const [student, setStudent] = useState([]);
  
  const newStudent = {
    fullName: fullName, email: email, phone: phone, address: address,
    age: age, biography: biography, photo: file, groupId: groupId
  };

  const getAsync = async (id) => {
    try {
      await axios.get(`${baseUrl}/api/student/getbyid/${id}`)
        .then((res) => {
          setStudent(res.data);
          setFullName(res.data.fullName);
          setAddress(res.data.address);
          setPhone(res.data.phone);
          setAge(res.data.age);
          setBiography(res.data.biography);
          setEmail(res.data.email);
          setImage(res.data.image);
          setGroupId(res.data.groupId);
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

    for (const [key, value] of Object.entries(newStudent)) {
      formData.append(key, value);
    };

    try {
      await axios.put(`${baseUrl}/api/student/update/${id}`, formData,
      { headers: { "Authorization": `Bearer ${token}` } })
      .then(() => {
        navigate("/students")
      })
    }
    catch (error) {
      const errors = error.response.data.errors;
      if (errors.FullName !== undefined) {
        if (errors.FullName.length > 0) {
          setInvalidFullName(true);
          setInvalidFullNameMessage(errors.FullName)
        }
      }
      if (errors.Email !== undefined) {
        if (errors.Email.length > 0) {
          setInvalidEmail(true);
          setInvalidEmailMessage(errors.Email)
        }
      }
      if (errors.Phone !== undefined) {
        if (errors.Phone.length > 0) {
          setInvalidPhone(true);
          setInvalidPhoneMessage(errors.Phone)
        }
      }
      if (errors.Age !== undefined) {
        if (errors.Age.length > 0) {
          setInvalidAge(true);
          setInvalidAgeMessage(errors.Age)
        }
      }
      if (errors.Address !== undefined) {
        if (errors.Address.length > 0) {
          setInvalidAddress(true);
          setInvalidAddressMessage(errors.Address)
        }
      }
      if (errors.Biography !== undefined) {
        if (errors.Biography.length > 0) {
          setInvalidBiography(true);
          setInvalidBiographyMessage(errors.Biography)
        }
      }
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setInvalidFullName(false)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setInvalidEmail(false);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setInvalidAddress(false)
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
    setInvalidAge(false)
  };
  const handleBiographyChange = (e) => {
    setBiography(e.target.value);
    setInvalidBiography(false);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setInvalidPhone(false)
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleGroupChange = (e) => {
    setGroupId(e.target.value);
  };

  const getGroupsAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/group/getall?skip=0&take=0`)
      .then((res) => {
        if (res.data.datas.length > 0) {
          setGroups(res.data.datas)
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

  useEffect(() => {
    getAsync(id)
    getGroupsAsync();
  }, []);


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
            {
              image != null ?
                <div className="image-area">
                  <img src={`data:image;base64,${image}`} />
                </div>
                : null
            }
            <Form className='mt-5' onSubmit={(e) => handleSubmit(e)}>
              <FormGroup>
                <InputGroup>
                  <Input type='file' id='file' onChange={handleFileChange} />
                  <Label className='btn-2' for='file' >Upload</Label>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Full name</InputGroupText>
                  <Input type='text' invalid={invalidFullName} value={fullName} name={fullName} onChange={handleFullNameChange} />
                  {
                    invalidFullName && (
                      <FormFeedback invalid>
                        {invalidFullNameMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Email</InputGroupText>
                  <Input invalid={invalidEmail} value={email} name={email} onChange={handleEmailChange} />
                  {
                    invalidEmail && (
                      <FormFeedback invalid>
                        {invalidEmailMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Phone</InputGroupText>
                  <Input type='text' invalid={invalidPhone} value={phone} name={phone} onChange={handlePhoneChange} />
                  {
                    invalidPhone && (
                      <FormFeedback invalid>
                        {invalidPhoneMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Age</InputGroupText>
                  <Input type='number' invalid={invalidAge} value={age} name={age} onChange={handleAgeChange} />
                  {
                    invalidAge && (
                      <FormFeedback invalid>
                        {invalidAgeMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Addres</InputGroupText>
                  <Input type='text' invalid={invalidAddress} value={address} name={address} onChange={handleAddressChange} />
                  {
                    invalidAddress && (
                      <FormFeedback invalid>
                        {invalidAddressMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Biography</InputGroupText>
                  <Input type='textarea' invalid={invalidBiography} value={biography} name={biography} onChange={handleBiographyChange} />
                  {
                    invalidBiography && (
                      <FormFeedback invalid>
                        {invalidBiographyMessage}
                      </FormFeedback>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Group</InputGroupText>
                  <Input type="select" name='select' value={groupId} onChange={(e) => handleGroupChange(e)} >
                    {
                      groups.map(function (group, i) {
                        return  <option value={group.id} key={i}>{group.name}</option>
                      })
                    }
                  </Input>
                </InputGroup>
              </FormGroup>
              <Tooltip title='Go to list' arrow placement="bottom-start">
                <NavLink to='/students'>
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

export default EditStudent
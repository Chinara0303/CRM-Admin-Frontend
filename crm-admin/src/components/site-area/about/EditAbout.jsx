import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React,{ useEffect ,useState} from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import Swal from 'sweetalert2'

function EditAbout() {
    const token = JSON.parse(localStorage.getItem('user-info'));
    console.log(token)

    const navigate = useNavigate();
    const { id } = useParams();
   const baseUrl = "https://localhost:7069";
    const [about, setAbout] = useState();
    const [file, setFile] = useState(null);
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [subTitle, setSubTitle] = useState();
    const [description, setDescription] = useState();

    const newAbout = { photo: file, title: title,subTitle:subTitle, description: description };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/about/getbyid/${id}`)
                .then((res) => {
                    setAbout(res.data);
                    setImage(res.data.image);
                    setTitle(res.data.title);
                    setSubTitle(res.data.subTitle);
                    setDescription(res.data.description);
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

        for (const [key, value] of Object.entries(newAbout)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/about/update/${id}`, formData,
            { headers: { "Authorization": `Bearer ${token}` } }) 
            .then(() => {
                navigate("/educations")
            })
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

    };
    useEffect(() => {
        getAsync(id)
    }, [])

    return (
        <div className='edit-area mt-5'>
            <div className="title-area">
                <Paper>
                    <h4>Edit</h4>
                </Paper>
            </div>
            <Container maxWidth='lg'>
                <Grid container >
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
                                <Input type='file' id='file' name={file} onChange={(e)=> setFile(e.target.files[0])} />
                                <Label className='btn-2' for='file' >Upload</Label>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Title</InputGroupText>
                                    <Input type='text' value={title} name={title} onChange={(e)=>setTitle(e.target.value)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Title</InputGroupText>
                                    <Input type='text' value={subTitle} name={subTitle} onChange={(e)=>setSubTitle(e.target.value)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Description</InputGroupText>
                                    <Input type='textarea' name={description} value={description} onChange={(e)=>setDescription(e.target.value)}  />
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/site/about'>
                                    <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                                </NavLink>
                            </Tooltip>

                            <Button type='submit' style={{ border: "none" }} color='transparent'>
                                <Tooltip title='Update' arrow placement="bottom-start">
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

export default EditAbout
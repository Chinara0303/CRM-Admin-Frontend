import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import axios from 'axios'
import React,{ useEffect ,useState} from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form, FormGroup, Input, InputGroup, Button, InputGroupText, Label } from 'reactstrap'
import Swal from 'sweetalert2'

function EditSlider() {
    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = "https://localhost:7069";

    const [slider, setSlider] = useState();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const newSlider = { photo: file, title: title, description: description };

    const getAsync = async (id) => {
        try {
            await axios.get(`${baseUrl}/api/slider/getbyid/${id}`)
                .then((res) => {
                    setSlider(res.data);
                    setImage(res.data.image);
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                });

        } catch (error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            console.log(error);

        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const [key, value] of Object.entries(newSlider)) {
            formData.append(key, value);
        };

        try {
            await axios.put(`${baseUrl}/api/slider/update/${id}`, formData, {
                headers: {
                    Accept: "*/*"
                }
            }).then(() => {
                navigate("/site/sliders")
            })
        }
        catch (error) {
            Swal.fire({
                title: 'Heey!',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            console.log(error);
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
                                    <InputGroupText>Description</InputGroupText>
                                    <Input type='textarea' name={description} value={description} onChange={(e)=>setDescription(e.target.value)}  />
                                </InputGroup>
                            </FormGroup>
                            <Tooltip title='Go to list' arrow placement="bottom-start">
                                <NavLink to='/site/sliders'>
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

export default EditSlider
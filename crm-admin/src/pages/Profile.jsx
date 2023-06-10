import { faChevronLeft, faFloppyDisk, faHouse, faHouseChimneyWindow, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper, Tooltip, Container, Grid, List, ListItem, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import { Form, FormGroup, Input, InputGroup, InputGroupText, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { NavLink } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function Profile(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangeClick = () => props.setChange(!props.change)


    return (

        <div className='profile-area'>
            <div className="title-area">
                <Paper>
                    <Box>
                        <div className="left-side">
                            <div className="logo-area">
                                <img className='img-fluid' src={require('../assets/images/logo.png')} alt="" />
                            </div>
                            <div className="info-area">
                                <h4>Chinara Ibadova</h4>
                                <p>Ceo</p>
                            </div>
                        </div>
                        <div className="right-side">
                            <NavLink to='/site/dashboard' onClick={() => handleChangeClick()}>
                                {
                                    props.change && (
                                        <Tooltip title="Site">
                                            <FontAwesomeIcon icon={faHouseChimneyWindow} size='2xl' style={{ color: "white" }} />
                                        </Tooltip>
                                    )
                                }
                                {
                                    !props.change && (
                                        <Tooltip title="Management">
                                            <FontAwesomeIcon icon={faHouse} size='2xl' style={{ color: "white" }} />
                                        </Tooltip>
                                    )
                                }
                            </NavLink>

                        </div>
                    </Box>
                </Paper>
            </div>
            <Paper style={{ marginTop: "30px", padding: "30px 0" }}>
                <Container>
                    <Grid container spacing={10} >
                        <Grid item lg={6} xs={12} sm={6}>
                            <div className="profile-detail">
                                <div className="top-area">
                                    <p>Profile information</p>

                                    <Button onClick={() => handleOpen()}>
                                        <FontAwesomeIcon icon={faPen} size="sm" style={{ color: "#5d5d5d", cursor: 'pointer' }} />
                                    </Button>
                                    <div>
                                        <Modal
                                            open={open}
                                            onClose={handleClose} >
                                            <Box sx={style}>
                                                <p>Edit personal information</p>
                                                <Form>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText>Full name</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText>Email</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText>Address</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Mobile</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Linkedin</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Twitter</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <InputGroupText >Facebook</InputGroupText>
                                                            <Input type='text' />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <Tooltip title='Close' onClose={handleClose} arrow placement="bottom-start">
                                                        <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", cursor: 'pointer' }} />
                                                    </Tooltip>
                                                    <Button type='submit' style={{ border: "none" }}>
                                                        <Tooltip title='save'>
                                                            <FontAwesomeIcon icon={faFloppyDisk} size="2xl" style={{ color: "#0ae60d" }} />
                                                        </Tooltip>
                                                    </Button>
                                                </Form>
                                            </Box>
                                        </Modal>

                                    </div>
                                </div>
                                <div className="bottom-area mt-2">
                                    <p>Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
                                    <List>
                                        <ListItem>
                                            Fullname:
                                        </ListItem>
                                        <ListItem>
                                            Mobile:
                                        </ListItem>
                                        <ListItem>
                                            Email:
                                        </ListItem>
                                        <ListItem>
                                            Social:
                                        </ListItem>
                                    </List>
                                </div>
                                <hr />

                            </div>
                        </Grid>
                        <Grid item lg={6} xs={12} sm={6}>
                            <div className="subscribe-area">
                                <div className="top-area">
                                    <p>Subscribes</p>
                                </div>
                                <div className="bottom-area">
                                    <div className="subscribe">
                                        <p>jsjsjs</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </Container>
            </Paper>
        </div>
    )
}

export default Profile
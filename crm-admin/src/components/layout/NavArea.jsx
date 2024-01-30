import { Breadcrumbs, Link, TextField, Container, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';


function NavArea(props) {
   const baseUrl = "https://localhost:7069";

    const handleClick = () => {
        props.setMenuOpen(!props.menuOpen)
    }

    const [text, setText] = useState("");

    const handleeeClick = (e) => {
        setText(e.target.previousElementSibling.innerHTML)
    }

    window.addEventListener("scroll", function () {
        let nav = this.document.querySelector(".nav-area").getBoundingClientRect().top;
        nav > 0 ? document.querySelector(".top-area").classList.remove("fixed") : document.querySelector(".top-area").classList.add("fixed");
    })

    const token = JSON.parse(localStorage.getItem('user-info'));
    const [user, setUser] = useState([])

    const getUserInfoAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/account/profile`,
                {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then((res) => {
                    setUser(res.data)
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

    useEffect(() => {
        getUserInfoAsync()
    }, []);

    return (
        <div className='nav-area'>
            <div className="top-area">
                <Container maxWidth='xl'>
                    <Grid container spacing={3}>
                        <Grid item xs={6} lg={6} sm={6}>
                            <div className="left-side">
                                <div className="breadcrumb-area">

                                    <Breadcrumbs aria-label="breadcrumb">
                                        <Link underline="hover" href="/dashboard">
                                            <FontAwesomeIcon icon={faHouseChimneyWindow} size="sm" style={{ color: "rgb(52, 71, 103)", opacity: "0.5" }} />
                                        </Link>
                                        <Link underline="hover" color="inherit" >
                                            {props.text}
                                        </Link>
                                    </Breadcrumbs>
                                    <h5>{props.text}</h5>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} lg={6} sm={6}>
                            <div className="right-side">
                                <div className={`hamburger d-lg-none ${props.menuOpen && 'active'}`} onClick={() => handleClick()}>
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                    <span className="line3"></span>
                                </div>
                                <NavLink to='/profile' onClick={(e) => handleeeClick(e)}>
                                    <div className="logo-area">
                                        <span style={{ display: "none" }}>Profile</span>
                                        <img src={`data:image/;base64,${user.image}`} alt="" />
                                    </div>
                                </NavLink>
                            </div>
                        </Grid>

                    </Grid>
                    {/* <Grid item sm={12}>
                        <TextField id="outlined-basic" className='d-lg-none d-md-none d-block' label="Search..." variant="outlined" />
                    </Grid> */}
                </Container>


            </div>
        </div>
    )
}

export default NavArea
import { Breadcrumbs, Link, TextField, Container, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { MyContext } from '../../MyContext';


function NavArea(props) {

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

    const baseUrl = "http://webfulleducation-001-site1.atempurl.com";

    const token = JSON.parse(localStorage.getItem('user-info'));
    const [user, setUser] = useState([])

    const getUserInfoAsync = async () => {
        try {
            await axios.get(`${baseUrl}/api/account/profile`,
                {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then((res) => {
                    console.log(props.text)
                    console.log(text)
                    
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
        setText(props.text)
        console.log("ddd");
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
                                    {/* {
                                        props.text !== "Profile" ?
                                            <>
                                                <Breadcrumbs aria-label="breadcrumb">
                                                    <Link underline="hover" href="/dashboard">
                                                        <FontAwesomeIcon icon={faHouseChimneyWindow} size="sm" style={{ color: "rgb(52, 71, 103)", opacity: "0.5" }} />
                                                    </Link>
                                                    <Link underline="hover" color="inherit" >
                                                        {props.text}
                                                    </Link>
                                                </Breadcrumbs>
                                                <h5>{props.text}</h5>
                                            </>
                                                :null

                                    }
                                    {
                                        text === "Profile" ?
                                        <> */}
                                        <Breadcrumbs aria-label="breadcrumb">
                                                    <Link underline="hover" href="/dashboard">
                                                        <FontAwesomeIcon icon={faHouseChimneyWindow} size="sm" style={{ color: "rgb(52, 71, 103)", opacity: "0.5" }} />
                                                    </Link>
                                                    <Link underline="hover" color="inherit" >
                                                        {text}
                                                    </Link>
                                                </Breadcrumbs>
                                                <h5>{text}</h5>
                                        {/* </>
                                        : null
                                        
                                    } */}

                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} lg={6} sm={6}>
                            <div className="right-side">
                                <NavLink to='/profile' onClick={(e) => handleeeClick(e)}>
                                    <span style={{ display: "none" }}>Profile</span>
                                    <img src={`data:image/;base64,${user.image}`} alt="" />
                                </NavLink>
                                <div className={`hamburger d-lg-none ${props.menuOpen && 'active'}`} onClick={() => handleClick()}>
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                    <span className="line3"></span>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid item sm={12}>
                        <TextField id="outlined-basic" className='d-lg-none d-md-none d-block' label="Search..." variant="outlined" />
                    </Grid>
                </Container>


            </div>
        </div>
    )
}

export default NavArea
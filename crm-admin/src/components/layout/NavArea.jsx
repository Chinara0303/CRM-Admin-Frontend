import { Breadcrumbs, Link, TextField, Container, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
// import { MyContext } from '../../MyContext';
import { NavLink } from 'react-router-dom';

function NavArea(props) {
    const handleClick = () => {
        props.setMenuOpen(!props.menuOpen)
    }
    window.addEventListener("scroll", function () {
        let nav = this.document.querySelector(".nav-area").getBoundingClientRect().top;
        nav > 0 ? document.querySelector(".top-area").classList.remove("fixed") : document.querySelector(".top-area").classList.add("fixed");
    })

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
                                {/* <TextField id="outlined-basic" className='d-lg-block d-md-block d-none' label="Search..." variant="outlined" /> */}
                               <NavLink to='/profile' >
                                 <img src={require('../../assets/images/logo.png')} alt="" />
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
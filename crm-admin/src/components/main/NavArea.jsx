import { Box, Paper, Breadcrumbs, Link, TextField, Container, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faArrowRightToBracket, faUserPlus, faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import { MyContext } from '../../MyContext';

function NavArea() {
    const { text, setText } = useContext(MyContext);
    return (
        <div className='nav-area'>
            <div className="top-area">
                <div className="left-side">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" href="/">
                            <FontAwesomeIcon icon={faHouseChimneyWindow} size="sm" style={{ color: "rgb(52, 71, 103)", opacity: "0.5" }} />
                        </Link>
                        <Link underline="hover" color="inherit" >
                            {text}
                        </Link>
                    </Breadcrumbs>
                    <h5>{text}</h5>
                </div>
                <div className="right-side">
                    <TextField id="outlined-basic" label="Search..." variant="outlined" />
                    <img src={require('../../assets/images/logo.png')} alt="" />
                </div>
            </div>
        </div>
    )
}

export default NavArea
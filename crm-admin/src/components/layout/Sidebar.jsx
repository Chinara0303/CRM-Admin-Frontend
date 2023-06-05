import { Box, Paper, Breadcrumbs, Link, TextField, Container, Grid } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faArrowRightToBracket, faUserPlus, faHouseChimneyWindow,faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { MyContext } from '../../MyContext';


function Sidebar() {
    const { text, setText } = useContext(MyContext);
    const handleClick = (e) => {
        setText(e.target.innerText)
    }
    return (
            <Paper className='sidebar-area'>
                <div className="logo-area">
                    <img src={require('../../assets/images/logo.png')} alt="" />
                    <h4 className='text-center'>WebFullEdu</h4>
                </div>
                <hr />
                <div className="navigate-area">
                    <NavLink to='/' className='navigate'  >
                        <div className="single-nav" >
                            <FontAwesomeIcon icon={faBorderAll} size="lg" style={{ color: "#fff", }} />
                            <h5 onClick={(e) => handleClick(e)}>Dashboard</h5>
                        </div>
                    </NavLink>
                    <NavLink className='navigate' to='/signin'>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" style={{ color: "#fff", }} />
                            <h5 onClick={(e) => handleClick(e)}>Sign in</h5>
                        </div>
                    </NavLink>
                    <NavLink className='navigate' to='/signup'>
                    <div className="single-nav">
                        <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Sign up</h5>
                    </div>
                    </NavLink>
                    <NavLink className='navigate' to='/rooms'>
                    <div className="single-nav">
                        <FontAwesomeIcon icon={faStroopwafel} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Rooms</h5>
                    </div>
                    </NavLink>
                </div>
            </Paper>
    )
}

export default Sidebar
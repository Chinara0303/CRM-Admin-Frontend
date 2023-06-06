import { Paper } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faStroopwafel, faCalendarDays, faCalendarWeek, faChalkboardUser } from '@fortawesome/free-solid-svg-icons'
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
                <NavLink to='/dashboard' className='navigate'  >
                    <div className="single-nav" >
                        <FontAwesomeIcon icon={faBorderAll} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Dashboard</h5>
                    </div>
                </NavLink>
                {/* <NavLink className='navigate' to='/signin'>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" style={{ color: "#fff", }} />
                            <h5 onClick={(e) => handleClick(e)}>Sign in</h5>
                        </div>
                    </NavLink> */}
                {/* <NavLink className='navigate' to='/signup'>
                    <div className="single-nav">
                        <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Sign up</h5>
                    </div>
                    </NavLink> */}
                <NavLink className='navigate' to='/rooms'>
                    <div className="single-nav">
                        <FontAwesomeIcon icon={faStroopwafel} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Rooms</h5>
                    </div>
                </NavLink>
                <NavLink className='navigate' to='/seanses'>
                    <div className="single-nav">
                        <FontAwesomeIcon icon={faCalendarDays} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Seanses</h5>
                    </div>
                </NavLink>
                <NavLink className='navigate' to='/weekdays'>
                    <div className="single-nav">
                        <FontAwesomeIcon icon={faCalendarWeek} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Weekdays</h5>
                    </div>
                </NavLink>
                <NavLink className='navigate' to='/positions'>
                    <div className="single-nav">
                        <FontAwesomeIcon icon={faChalkboardUser} size="lg" style={{ color: "#fff", }} />
                        <h5 onClick={(e) => handleClick(e)}>Positions</h5>
                    </div>
                </NavLink>
            </div>
        </Paper>
    )
}

export default Sidebar
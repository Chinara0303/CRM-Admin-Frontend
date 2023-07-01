import { Paper } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll,faCircleInfo, faUserPlus, faStroopwafel, faCalendarDays, faCalendarWeek, faChalkboardTeacher, faUserTie, faUsers, faLayerGroup, faGraduationCap, faAddressCard, faGears, faImages } from '@fortawesome/free-solid-svg-icons'
import { faBuffer} from '@fortawesome/free-brands-svg-icons'
import { useContext } from 'react';
import { MyContext } from '../../MyContext';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';


function Sidebar(props) {
    const { text, setText } = useContext(MyContext);
    const handleClick = (e) => {
        setText(e.target.innerText)
    }
    const handleClose = () => {
        props.setMenuOpen(false)
    }
    return (
        <Paper className={`sidebar-area ${props.menuOpen && 'active'}`}>
            <div className="logo-area">
                <img src={require('../../assets/images/logo.png')} alt="" />
                <h4 className='text-center'>WebFullEdu</h4>
            </div>
            <hr />
            {
                props.change && (
                    <div className="navigate-area">
                        <NavLink to='/dashboard' className='navigate' onClick={() => handleClose()} >
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
                        <NavLink className='navigate' to='/rooms' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faStroopwafel} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Rooms</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/seanses' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faCalendarDays} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Seanses</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/positions' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faUserTie} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Positions</h5>
                            </div>
                        </NavLink>

                        <NavLink className='navigate' to='/teachers' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Teachers</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/staff' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faUsers} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Staff</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/groups' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faLayerGroup} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Groups</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/students' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faGraduationCap} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Students</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/groupteacher' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Add teacher to group</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/educations' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faDiscourse} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Educations</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/time' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faUserTie} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Time</h5>
                            </div>
                        </NavLink>
                    </div>
                )
            }
            {
                !props.change && (
                    <div className="navigate-area">
                        <NavLink to='/site/dashboard' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" >
                                <FontAwesomeIcon icon={faBorderAll} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Dashboard</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/educations' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" >
                                <FontAwesomeIcon icon={faDiscourse} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Educations</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/settings' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" >
                                <FontAwesomeIcon icon={faGears} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Settings</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/sliders' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" >
                                <FontAwesomeIcon icon={faImages} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Sliders</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/banners' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" >
                                <FontAwesomeIcon icon={faBuffer} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Banners</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/teachers' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" >
                                <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>Teachers</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/site/about' onClick={() => handleClose()}>
                            <div className="single-nav">
                                <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#fff", }} />
                                <h5 onClick={(e) => handleClick(e)}>About</h5>
                            </div>
                        </NavLink>
                    </div>
                )
            }
        </Paper>
    )
}

export default Sidebar
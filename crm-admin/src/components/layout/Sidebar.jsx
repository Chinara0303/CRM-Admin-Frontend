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

        setText(e.target.innerText);
    }
    const handleClose = () => {
        props.setMenuOpen(false)
    }
    return (
        <Paper className={`sidebar-area ${props.menuOpen && 'active'}`}>
            <div className="logo-area">
                <img src={require('../../assets/images/download.png')} alt="" />
            </div>
            <hr />
            {
                props.change && (
                    <div className="navigate-area">
                        <NavLink to='/dashboard' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faBorderAll} size="lg" style={{ color: "#fff", }} />
                                <h5>Dashboard</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/educations' onClick={() => handleClose()}>
                            <div className="single-nav"  onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faDiscourse} size="lg" style={{ color: "#fff", }} />
                                <h5>Educations</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/positions' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faUserTie} size="lg" style={{ color: "#fff", }} />
                                <h5 >Positions</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/staff' onClick={() => handleClose()}>
                            <div className="single-nav"  onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faUsers} size="lg" style={{ color: "#fff", }} />
                                <h5>Staff</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/teachers' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" style={{ color: "#fff", }} />
                                <h5>Teachers</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/groups' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faLayerGroup} size="lg" style={{ color: "#fff", }} />
                                <h5>Groups</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/groupteacher' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                                <h5>Teacher group</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/students' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faGraduationCap} size="lg" style={{ color: "#fff", }} />
                                <h5>Students</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/rooms' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faStroopwafel} size="lg" style={{ color: "#fff", }} />
                                <h5 >Rooms</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/seanses' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faCalendarDays} size="lg" style={{ color: "#fff", }} />
                                <h5 >Seanses</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/time' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faUserTie} size="lg" style={{ color: "#fff", }} />
                                <h5>Time</h5>
                            </div>
                        </NavLink>
                      
                    </div>
                )
            }
            {
                !props.change && (
                    <div className="navigate-area">
                        <NavLink to='/site/dashboard' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)} >
                                <FontAwesomeIcon icon={faBorderAll} size="lg" style={{ color: "#fff", }} />
                                <h5>Dashboard</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/educations' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)} >
                                <FontAwesomeIcon icon={faDiscourse} size="lg" style={{ color: "#fff", }} />
                                <h5>Educations</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/setting' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)} >
                                <FontAwesomeIcon icon={faGears} size="lg" style={{ color: "#fff", }} />
                                <h5>Settings</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/sliders' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)} >
                                <FontAwesomeIcon icon={faImages} size="lg" style={{ color: "#fff", }} />
                                <h5>Sliders</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/banners' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)} >
                                <FontAwesomeIcon icon={faBuffer} size="lg" style={{ color: "#fff", }} />
                                <h5>Banners</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/teachers' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)} >
                                <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" style={{ color: "#fff", }} />
                                <h5>Teachers</h5>
                            </div>
                        </NavLink>
                        <NavLink className='navigate' to='/site/about' onClick={() => handleClose()}>
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{ color: "#fff", }} />
                                <h5>About</h5>
                            </div>
                        </NavLink>
                        <NavLink to='/site/contact' className='navigate' onClick={() => handleClose()} >
                            <div className="single-nav" onClick={(e) => handleClick(e)}>
                                <FontAwesomeIcon icon={faBorderAll} size="lg" style={{ color: "#fff", }} />
                                <h5>Contacts</h5>
                            </div>
                        </NavLink>
                    </div>
                )
            }
        </Paper>
    )
}

export default Sidebar
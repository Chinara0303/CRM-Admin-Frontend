import { faHouse, faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper, Tooltip } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Profile(props) {
    const handleChangeClick = () => {
        props.setChange(!props.change)
    }
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
            <Paper style={{ marginTop: "30px" }}>
                cdfvgbhn
            </Paper>
        </div>
    )
}

export default Profile
import { Box, Paper} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faArrowRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

function Sidebar() {
    const [active, setActive] = useState(false);
    let handleClick = () => {
        console.log("salam")
    }
    return (
        <div>
            <Box sx={{
                display: 'flex',
                '& > :not(style)': {
                    m: 1,
                    width: 300,
                },
            }}  >
                <Paper className='sidebar-area'>
                    <div className="logo-area">
                        <img src={require('../../assets/images/logo.png')} alt="" />
                        <h4 className='text-center'>WebFullEdu</h4>
                    </div>
                    <hr />
                    <div className="navigate-area">
                        <div className="single-nav" onClick={handleClick()}>
                            <FontAwesomeIcon icon={faBorderAll} size="lg" style={{ color: "#fff", }} />
                            <h5>Dashboard</h5>
                        </div>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign in</h5>
                        </div>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div>
                        <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div> <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div> <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div> <div className="single-nav">
                            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#fff", }} />
                            <h5>Sign up</h5>
                        </div>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default Sidebar
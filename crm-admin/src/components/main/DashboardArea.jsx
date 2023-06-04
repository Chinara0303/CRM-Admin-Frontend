import { Breadcrumbs, Link, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function DashboardArea() {
  return (
    <div className='dashboard-area'>
      <div className="top-area">
        <div className="left-side">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" href="/">
              <FontAwesomeIcon icon={faHouseChimneyWindow} size="sm" style={{ color: "rgb(52, 71, 103)", opacity: "0.5" }} />
            </Link>
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
          </Breadcrumbs>
          <h5>Dashboard</h5>
        </div>
        <div className="right-side">
          <TextField id="outlined-basic" label="Search..." variant="outlined" />
        <img src={require('../../assets/images/logo.png')} alt="" />
        </div>
      </div>
    </div>
  )
}

export default DashboardArea
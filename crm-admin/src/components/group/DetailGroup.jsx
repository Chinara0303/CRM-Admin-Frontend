import { faChevronLeft, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Container, Grid, Paper, Tooltip } from '@mui/material'
import React from 'react'

function DetailGroup() {
  return (
    <div className='detail-area area'>
    <div className="title-area">
        <Paper>
            <h4>Detail</h4>
        </Paper>
    </div>
    <Container maxWidth='lg'>
        <Grid container>
            <Paper>
                <Tooltip title='Name' placement='left' arrow>
                    <div className="single-area">
                        <p>p135</p>
                    </div>
                </Tooltip>
                <Tooltip title='Room' placement='left' arrow>
                    <div className="single-area">
                        <p>SUN</p>
                    </div>
                </Tooltip>
                <Tooltip title='Seans' placement='left' arrow>
                    <div className="single-area">
                        <p>Seher</p>
                    </div>
                </Tooltip>
                <Tooltip title='Go to list'  arrow placement="bottom-start">
                    <NavLink to='/groups'>
                        <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: "#005eff", }} />
                    </NavLink>
                </Tooltip>
            </Paper>
        </Grid>
    </Container>
</div>
  )
}

export default DetailGroup
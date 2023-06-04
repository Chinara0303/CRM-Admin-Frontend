import React from 'react'
import { Container, Grid } from '@mui/material'
import Sidebar from '../components/layout/Sidebar'
import DashboardArea from '../components/main/DashboardArea'

function Dashboard() {
  return (
    <Container maxWidth='xl' className='mt-3 dashboard'>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Sidebar />
        </Grid>
        <Grid item lg={9}>
          <DashboardArea />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
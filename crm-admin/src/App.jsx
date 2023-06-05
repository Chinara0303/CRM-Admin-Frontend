import { Container, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import { createContext } from 'react'
import { useState } from 'react';
import { MyContext } from './MyContext';
import Signup from './pages/Signup';
import NavArea from './components/main/NavArea';
import Room from './pages/Room';


function App() {
  const [text, setText] = useState("Dashboard");
  return (
    <div className='body'>
      <Router>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <MyContext.Provider value={{ text, setText }}>
                <Sidebar />
              </MyContext.Provider>
            </Grid>
            <Grid item lg={9}>
              <MyContext.Provider value={{ text, setText }}>
                <NavArea />
              </MyContext.Provider>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/rooms' element={<Room />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>



  );
}

export default App;

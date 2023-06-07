import { Container, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import { useState } from 'react';
import { MyContext } from './MyContext';
// import Signup from './pages/Signup';
import NavArea from './components/layout/NavArea';
import Room from './pages/Room';
import AddRoom from './components/room/AddRoom';
import AddSeans from './components/seans/AddSeans';
import EditRoom from './components/room/EditRoom';
import Seans from './pages/Seans';
import EditSeans from './components/seans/EditSeans';
import Weekday from './pages/Weekday';
import AddWeekday from './components/weekday/AddWeekday';
import EditWeekday from './components/weekday/EditWeekday';
import Position from './pages/Position';
import AddPosition from './components/position/AddPosition';
import EditPosition from './components/position/EditPosition';
import Teacher from './pages/Teacher';
import AddTeacher from './components/teacher/AddTeacher';
import EditTeacher from './components/teacher/EditTeacher';
import DetailtTeacher from './components/teacher/DetailtTeacher';
import Staff from './pages/Staff';


function App() {
  const [text, setText] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='body'>
      <Router>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <MyContext.Provider value={{ text, setText }}>
                <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              </MyContext.Provider>
            </Grid>
            <Grid item lg={9}>
              <MyContext.Provider value={{ text, setText }}>
                <NavArea menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              </MyContext.Provider>
              <Routes>
                <Route path='/signin' element={<SignIn />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/rooms' element={<Room />} />
                <Route path='/rooms/create' element={<AddRoom />} />
                <Route path='/rooms/edit/:id' element={<EditRoom />} />
                <Route path='/seanses' element={<Seans />} />
                <Route path='/seanses/create' element={<AddSeans />} />
                <Route path='/seanses/edit/:id' element={<EditSeans />} />
                <Route path='/weekdays' element={<Weekday />} />
                <Route path='/weekdays/create' element={<AddWeekday />} />
                <Route path='/weekdays/edit/:id' element={<EditWeekday />} />
                <Route path='/positions' element={<Position />} />
                <Route path='/positions/create' element={<AddPosition />} />
                <Route path='/positions/edit/:id' element={<EditPosition />} />
                <Route path='/teachers' element={<Teacher />} />
                <Route path='/teachers/create' element={<AddTeacher />} />
                <Route path='/teachers/edit/:id' element={<EditTeacher />} />
                <Route path='/teachers/detail/:id' element={<DetailtTeacher />} />
                <Route path='/staff' element={<Staff />} />

              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>



  );
}

export default App;

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
import DetailTeacher from './components/teacher/DetailTeacher';
import Staff from './pages/Staff';
import AddStaff from './components/staff/AddStaff';
import EditStaff from './components/staff/EditStaff';
import DetailStaff from './components/staff/DetailStaff';
import Group from './pages/Group';
import AddGroup from './components/group/AddGroup';
import EditGroup from './components/group/EditGroup';
import DetailGroup from './components/group/DetailGroup';
import Student from './pages/Student';
import AddStudent from './components/student/AddStudent';
import EditStudent from './components/student/EditStudent';
import DetailStudent from './components/student/DetailStudent';
import StaffPosition from './pages/StaffPosition';
import AddPositionToEmployee from './components/staffPosition/AddPositionToEmployee';
import GroupTeacher from './pages/GroupTeacher';
import AddTeacherToGroup from './components/group/AddTeacherToGroup';
import EditTeacherGroup from './components/group/EditTeacherGroup';
import EditStaffPosition from './components/staffPosition/EditStaffPosition';


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
                <Route path='/teachers/detail/:id' element={<DetailTeacher />} />
                <Route path='/staff' element={<Staff />} />
                <Route path='/staff/create' element={<AddStaff />} />
                <Route path='/staff/edit/:id' element={<EditStaff />} />
                <Route path='/staff/detail/:id' element={<DetailStaff />} />
                <Route path='/groups' element={<Group />} />
                <Route path='/groups/create' element={<AddGroup />} />
                <Route path='/groups/edit/:id' element={<EditGroup />} />
                <Route path='/groups/detail/:id' element={<DetailGroup />} />
                <Route path='/students' element={<Student />} />
                <Route path='/students/create' element={<AddStudent />} />
                <Route path='/students/edit/:id' element={<EditStudent />} />
                <Route path='/students/detail/:id' element={<DetailStudent />} />
                <Route path='/staffposition' element={<StaffPosition />} />
                <Route path='/staffposition/create' element={<AddPositionToEmployee />} />
                <Route path='/staffposition/edit/:id' element={<EditStaffPosition />} />
                <Route path='/groupteacher' element={<GroupTeacher />} />
                <Route path='/groupteacher/create' element={<AddTeacherToGroup />} />
                <Route path='/groupteacher/edit/:id' element={<EditTeacherGroup />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>



  );
}

export default App;

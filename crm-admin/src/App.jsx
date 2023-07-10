import { Container, Grid } from '@mui/material';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import { useEffect, useState } from 'react';
import { MyContext } from './MyContext';
import NavArea from './components/layout/NavArea';
import Room from './pages/Room';
import AddRoom from './components/room/AddRoom';
import AddSeans from './components/seans/AddSeans';
import EditRoom from './components/room/EditRoom';
import Seans from './pages/Seans';
import EditSeans from './components/seans/EditSeans';
import Position from './pages/Position';
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
import GroupTeacher from './pages/GroupTeacher';
import AddTeacherToGroup from './components/group/AddTeacherToGroup';
import Education from './pages/Education';
import AddEducation from './components/education/AddEducation';
import DetailEducation from './components/education/DetailEducation';
import EditEducation from './components/education/EditEducation';
import Profile from './pages/Profile';
import SiteDashboard from './pages/site-area/SiteDashboard';
import SiteSetting from './pages/site-area/SiteSetting';
import SiteDetailEducation from './components/site-area/education/SiteDetailEducation';
import SiteEditSetting from './components/site-area/setting/SiteEditSetting';
import SiteSlider from './pages/site-area/SiteSlider';
import AddSlider from './components/site-area/slider/AddSlider';
import EditSlider from './components/site-area/slider/EditSlider';
import Banner from './pages/site-area/Banner';
import AddBanner from './components/site-area/banner/AddBanner';
import SiteTeacher from './pages/site-area/SiteTeacher';
import SiteDetailTeacher from './components/site-area/teacher/SiteDetailTeacher';
import About from './pages/site-area/About';
import AddAbout from './components/site-area/about/AddAbout';
import DetailAbout from './components/site-area/about/DetailAbout';
import EditBanner from './components/site-area/banner/EditBanner';
import EditAbout from './components/site-area/about/EditAbout';
import DetailRoom from './components/room/DetailRoom';
import Time from './pages/Time';
import AddTime from './components/time/AddTime';
import DetailTime from './components/time/DetailTime';
import EditTime from './components/time/EditTime';
import SiteEducation from './pages/site-area/SiteEducation';

function App() {
  const [text, setText] = useState(() => {
    let storedValue = localStorage.getItem('text');
    return storedValue ? JSON.parse(storedValue) : 'Dashboard';
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [change, setChange] = useState(true);
  const [isLoggedİn, setİsLoggedİn] = useState(false);

  useEffect(() => {
   localStorage.setItem('text', JSON.stringify(text));
    if (localStorage.getItem('user-info')) {
      setİsLoggedİn(true)
    }
    else {
      setİsLoggedİn(false)
    }

  }, [text]);

  return (
    <div className='body'>
      <Router>
        <Routes>
          <Route exact path='/signin' element={<SignIn />} />
          <Route path='/' element={<Navigate to='/signin' />} />
        </Routes>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <MyContext.Provider value={{ text, setText }}>
                {
                  isLoggedİn && (
                    <Sidebar change={change} setChange={setChange} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                  )
                }
              </MyContext.Provider>
            </Grid>
            <Grid item lg={9}>
              {
                isLoggedİn && (
                  <NavArea text={text} setText={setText} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )
              }
              <Routes>
                <Route path='/profile' element={
                  <MyContext.Provider value={{ text, setText }}>
                    <Profile change={change} setChange={setChange} />
                  </MyContext.Provider>
                } />

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/rooms' element={<Room />} />
                <Route path='/rooms/create' element={<AddRoom />} />
                <Route path='/rooms/edit/:id' element={<EditRoom />} />
                <Route path='/rooms/detail/:id' element={<DetailRoom />} />
                <Route path='/seanses' element={<Seans />} />
                <Route path='/seanses/create' element={<AddSeans />} />
                <Route path='/seanses/edit/:id' element={<EditSeans />} />
                <Route path='/positions' element={<Position />} />
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
                <Route path='/groupteacher' element={<GroupTeacher />} />
                <Route path='/groupteacher/create' element={<AddTeacherToGroup />} />
                <Route path='/educations' element={<Education />} />
                <Route path='/educations/create' element={<AddEducation />} />
                <Route path='/educations/detail/:id' element={<DetailEducation />} />
                <Route path='/educations/edit/:id' element={<EditEducation />} />
                <Route path='/time' element={<Time />} />
                <Route path='/time/create' element={<AddTime />} />
                <Route path='/time/detail/:id' element={<DetailTime />} />
                <Route path='/time/edit/:id' element={<EditTime />} />



                <Route path='/site/dashboard' element={<SiteDashboard />} />
                <Route path='/site/educations' element={<SiteEducation />} />
                <Route path='/site/educations/detail/:id' element={<SiteDetailEducation />} />
                <Route path='/site/setting' element={<SiteSetting />} />
                <Route path='/site/setting/edit/:id' element={<SiteEditSetting />} />
                <Route path='/site/sliders' element={<SiteSlider />} />
                <Route path='/site/sliders/create' element={<AddSlider />} />
                <Route path='/site/sliders/edit/:id' element={<EditSlider />} />
                <Route path='/site/banners' element={<Banner />} />
                <Route path='/site/banners/create' element={<AddBanner />} />
                <Route path='/site/banners/edit/:id' element={<EditBanner />} />
                <Route path='/site/teachers' element={<SiteTeacher />} />
                <Route path='/site/teachers/detail/:id' element={<SiteDetailTeacher />} />
                <Route path='/site/about' element={<About />} />
                <Route path='/site/about/create' element={<AddAbout />} />
                <Route path='/site/about/detail/:id' element={<DetailAbout />} />
                <Route path='/site/about/edit/:id' element={<EditAbout />} />

              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>
  );
}

export default App;

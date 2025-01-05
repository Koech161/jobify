
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Job from './components/Job';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Notification from './components/Notification';
import AppyJob from './components/AppyJob';
import Profile from './components/Profile';
import PostJob from './components/PostJob';

function App() {
  return (
   <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Job/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/profi' element={<UserProfile />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/application' element={<AppyJob />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/post-job' element={<PostJob />} />
      </Routes>
    </div>
   </Router>
  );
}

export default App;

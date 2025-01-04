
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Job from './components/Job';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Notification from './components/Notification';

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
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/notification' element={<Notification />} />
      </Routes>
    </div>
   </Router>
  );
}

export default App;

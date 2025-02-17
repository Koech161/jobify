import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import { useUser } from './UserContext';
import { useNotifications } from './NotificationProvider';

const NavBar = () => {
  const {logout, isAuthenticated} = useAuth()
  const {unreadCount} = useNotifications()
  const {currentUser} = useUser()
  const navigate = useNavigate()
 
  
  const employer = currentUser.role === 'employer'
  const username = currentUser.username
 
  
  
  const handleLogout = async () => {
    await logout()
  }
  const handlePostJob = () => {
      navigate('/post-job')
  }
  return (
    <nav className="navbar navbar-expand-lg  fixed-top" style={{ fontSize: '20px',backgroundColor:'#1969e0' }}>
      <div className="container">
        {/* Navbar Brand */}
        <Link className="navbar-brand fw-bolder text-white" to="/" style={{ fontSize: '35px' }}>
          Jobify
        </Link>

        {/* Navbar Toggler for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
            <Link className="nav-link text-white" to="/jobs">
              Browse Jobs
            </Link>

            <Link className="nav-link text-white position-relative" to="/notification">
              <FaBell size={30}/> {unreadCount > 0 &&(
                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                  {unreadCount}
                  <span className='visually-hidden'>unread Notifications</span>
                  
                </span>
              )}
            </Link>

            
            {isAuthenticated ? (
              <>
              <Link className="nav-link text-white" to="/profile">
              {username} <FaUserCircle size={30}/>
            </Link>
              <Link className='nav-link text-white' onClick={handleLogout} to='/'>
              Logout</Link>
              </>
            ):<>
             <Link className="nav-link text-white" to="/login">
              Login
            </Link>

            <Link className="nav-link text-white" to="/register">
              Register
            </Link>
            </>
            
            }
           {isAuthenticated && employer ? (
            <>
            <button className='btn bg-success text-white' onClick={handlePostJob}>Post A Job</button>
            <Link  className='nav-link text-white' to='/employer/*'>Dashboard</Link>
            </>
           ): ''}
            
            
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

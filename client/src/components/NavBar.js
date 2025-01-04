import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
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
            <Link className="nav-link text-white" to="/profile">
              Profile
            </Link>
            <Link className="nav-link text-white" to="/notifications">
              Notification
            </Link>
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
            <Link className="nav-link text-white" to="/register">
              Register
            </Link>
            <button className='btn bg-success text-white'>Post A Job</button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

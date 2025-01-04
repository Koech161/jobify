import React from 'react';
import heroImg from '../assets/rb_61993.png';

const Home = () => {
  return (
    <div style={{ marginTop: '78px', backgroundColor:'#1969e0' }}>
      <div className="container mt-5 text-white">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="display-4">1236+ Job Listed</h2>
            <h1 className="mb-4">Find Your Dream Job Today</h1>
            <p className="lead">We have successfully secured jobs to 200+ job seekers.</p>
            <button className="btn btn-success btn-lg">Upload Your Resume</button>
          </div>
          <div className="col-md-6">
            <img className="img-fluid" src={heroImg} alt="hero-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

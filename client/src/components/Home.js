import React from 'react';
import heroImg from '../assets/rb_61993.png';
import How_it_works from './How_it_works';
import Why_us from './Why_us';
import Testimonial from './Testimonial';

const Home = ({ Jobs }) => {
 
  
  return (
    <div>
      <div className="hero-section" style={{ marginTop: '78px', backgroundColor: '#1969e0' }}>
        <div className="container mt-5 text-white">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="display-4">1236+ Job Listings</h2>
              <h1 className="mb-4">Find Your Dream Job Today</h1>
              <p className="lead">We have successfully helped 200+ job seekers secure their jobs.</p>
              <button className="btn btn-success btn-lg">Upload Your Resume</button>
            </div>
            <div className="col-md-6">
              <img className="img-fluid" src={heroImg} alt="Hero Image" />
            </div>
          </div>
        </div>
      </div>
      
      <How_it_works />

      <Why_us />

      <Testimonial />
    </div>
  );
};

export default Home;

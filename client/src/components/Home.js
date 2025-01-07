import React from 'react';
import heroImg from '../assets/rb_61993.png';

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
      
      <div className="container mt-5">
        <h3 className="mb-4">Browse Jobs</h3>
        <div className="row">
          {Jobs && Jobs.length > 0 ? (
            Jobs.map((job) => (
              <div className="col-md-4" key={job.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title"><strong>{job.title}</strong></h5>
                    
                    <p className="card-text"><strong>Location:</strong>  {job.location || 'No description available.'}</p>
                    <p className='card-text'><strong>Job Type:</strong> {job.job_type}</p>
                    <button className="btn btn-primary">Apply Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No jobs available at the moment. Please check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

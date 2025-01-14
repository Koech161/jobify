
import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { Modal, Button } from 'react-bootstrap';  
import { useNavigate } from 'react-router-dom';



const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        console.log('Fetched jobs:', res.data)
        setJobs(res.data);
        setFilteredJobs(res.data)
      } catch (error) {
        setError('Error fetching jobs');
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearchTerm = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    
    if (term.trim()) {
      const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(term.toLowerCase()) ||
    job.location.toLowerCase().includes(term.toLowerCase()) ||
    job.job_type.toLowerCase().includes(term.toLowerCase()) ||
    job.salary_range.toLowerCase().includes(term.toLowerCase()) ||
    job.requirements.toLowerCase().includes(term.toLowerCase())
  )
  setFilteredJobs(filtered)
    }else {
      setFilteredJobs(jobs)
    }
  }

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };
  const handleNavigate = () => {
    navigate('/application', {state: {job_id: selectedJob.id}})
  }
const JobsToDisplay = filteredJobs.slice(0,3)
  
  return (
    <div style={{marginTop:'140px'}}>
    <div className="container mt-5 " >
      <h1 className="text-center mb-4">Available Jobs</h1>
    <div className='d-flex justify-content-center mb-4'>
      <input
      type='text'
      className='form-control w-50'
      placeholder='Search for jobs...'
      value={searchTerm}
      onChange={handleSearchTerm} />
    </div>
      <div className="row">
        {filteredJobs.map((job) => (
          <div key={job.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm" onClick={() => handleCardClick(job)}>
              <div className="card-body">
                <h5 className="card-title fw-bold">{job.title}</h5>
                <p className="card-text"><strong>Location:</strong> {job.location}</p>
                <p className="card-text"><strong>Salary Range:</strong> {job.salary_range}</p>
                <p className="card-text"><strong>Job Type:</strong> {job.job_type}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-success">Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <Modal show={showModal} onHide={handleCloseModal} >
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Salary Range:</strong> {selectedJob.salary_range}</p>
            <p><strong>Job Type:</strong> {selectedJob.job_type}</p>
            <p className="card-text"><strong>Posted On:</strong> {new Date(selectedJob.posted_at).toLocaleDateString()}</p>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleNavigate} >Apply Now</Button>
        
          </Modal.Footer>
          
        </Modal>
      )}
    </div>
    
    </div>
  );
};

export default Job;

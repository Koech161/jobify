
import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { Modal, Button } from 'react-bootstrap';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (error) {
        setError('Error fetching jobs');
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div style={{marginTop:'140px'}}>
    <div className="container mt-5 " >
      <h1 className="text-center mb-4">Available Jobs</h1>
      <div className="row">
        {jobs.map((job) => (
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
            <Button variant="primary">Apply Now</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
    </div>
  );
};

export default Job;

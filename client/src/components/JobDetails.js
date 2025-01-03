import React, { useEffect, useState } from 'react'
import api from '../service/api'

const JobDetails = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs')
        setJobs(res.data)
      } catch (error) {
        setError('Error fetching jobs')
        console.error('Error fetching jobs:', error);
        
      }finally{
        setLoading(false)
      }
    }
    fetchJobs()
  },[])
  return (
    <div className="container mt-5 text-white">
    <h1 className="text-center mb-4">Job Details</h1>
    <div className="row">
      {jobs.map((job) => (
        <div key={job.id} className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-white">
              <h5 className="card-title">{job.title}</h5>
              <p className="card-text"><strong>Description:</strong> {job.description}</p>
              <p className="card-text"><strong>Requirements:</strong> {job.requirements}</p>
              <p className="card-text"><strong>Location:</strong> {job.location}</p>
              <p className="card-text"><strong>Salary Range:</strong> {job.salary_range}</p>
              <p className="card-text"><strong>Job Type:</strong> {job.job_type}</p>
              <p className="card-text"><strong>Posted On:</strong> {job.posted_at}</p>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-success">Apply Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default JobDetails

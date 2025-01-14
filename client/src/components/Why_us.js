import React from 'react'
import { useNavigate } from 'react-router-dom'

const Why_us = () => {
  const navigate  = useNavigate()

  const handleNavigate = () => {
    navigate('/jobs')
  }

  return (
    <div>
      <div className='container' style={{marginTop:'50px', marginBottom:'50px'}}>
        <div className='row'>
            <div className='col-md-6 mb-5'>
                <h2 className='fw-bold'>Why Choose Us</h2>

                <p className=''>Due to high rate of unemployment in the world, <br /> the idea of Jobify was born, to create opportunities to skill Youths.</p>

                <button  className='btn bg-info text-white' onClick={handleNavigate}>Explore Jobs</button>
            </div>

            <div className='col-md-6 bg-primary mb-5'>
            <h2 className='text-white' >Jobs Available For: </h2>
            <p className='badge bg-white text-dark'>Web Developers</p> <br />
            <p className='badge bg-white text-dark'>Data Scientists</p> <br />
            <p className='badge bg-white text-dark'>UX/UI Designer</p> <br />
            <p className='badge bg-white text-dark'>Software Developers</p>
        </div>
        </div>

        

      </div>
    </div>
  )
}

export default Why_us

import React from 'react'

const How_it_works = () => {
  return (

    <div className='container align-items-center justify-content-center text-center' style={{marginTop:'50px'}}>
        <h1 className='text-center fw-bolder'>How It Works</h1>

        <h3 className='text-center fw-bold'>It's easy to get work done</h3>
        <p className='text-center'>The best place to get direct clients</p>

        <div className='row '>
          <div className='col-md-4 mb-5'>
            <div className='card bg-warning text-white' style={{height:'10rem'}}>
              <div className='card-body'>
                <h3 className='card-title'>Login</h3>
                <p className='card-text'>
                  When you register to this website, you choose either employer or job seeker.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4 mb-5'>
            <div className='card bg-info' style={{height:'10rem'}}>
              <div className='card-body'>
                <h3 className='card-title'>Search for a job</h3>
                <p className='card-text'>
                 You can for job that fits your skill by either scrolling on listed jobs or by using search bar.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4 mb-5'>
            <div className='card bg-success text-white' style={{height:'10rem'}}>
              <div className='card-body'>
                <h3 className='card-title'>Apply</h3>
                <p className='card-text'>
                To apply for job you need to provide your resume and write a cover letter. If you meet the requirements Employer will contact you.
                </p>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default How_it_works

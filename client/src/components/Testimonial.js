// import React from 'react'
// import emp1 from '../assets/african-american-man-red-t-shirt-smiling-yellow-wall.jpg'
// import jb1 from '../assets/375240198_11475217.jpg'
// const Testimonial = () => {
//   return (
//     <div className='container ' style={{marginBottom:'50px'}}>
//         <h1 className='text-center'>Testimonies</h1>
//         <p className='text-center'>What our employers and job seekers says.</p>
//         <div className='scrollbar'>
//             <div className='container'>
//                 <div className='row over-flow-hidden'>
//                     <div className='col-md-4'>
//                         <div className='card text-center'>
//                             <div className='card-body'>
//                                 <img className='img-fluid round' src={emp1} alt='emp1'/>
//                                 <p className='card-text text-center'>Alvin Kamau</p> 
//                                 <p className='card-text text-success'>Employer</p>
//                                 <p className='card-text'>Jobify helps me get employee, just one day after posting job.</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='col-md-4'>
//                         <div className='card text-center'>
//                             <div className='card-body'>
//                                 <img className='img-fluid round' src={jb1} alt='jb1'/>
//                                 <p className='card-text text-center'>Peterson Omondi</p> 
//                                 <p className='card-text text-success'>Job Seeker</p>
//                                 <p className='card-text'>Jobify helps me get job within a week, after searching for job for the past 2 years.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default Testimonial
import React from 'react'
import emp1 from '../assets/african-american-man-red-t-shirt-smiling-yellow-wall.jpg'
import jb1 from '../assets/375240198_11475217.jpg'
import './Testimonial.css'

const Testimonial = () => {
  return (
    <div className='container' style={{ marginBottom: '50px' }}>
      <h1 className='text-center'>Testimonies</h1>
      <p className='text-center'>What our employers and job seekers say.</p>

      <div className='testimonial-container'>
        <div className='testimonial-cards d-flex overflow-auto'>
          {/* Testimonial 1 */}
          <div className='card text-center' style={{ minWidth: '100%', marginRight: '15px', flexShrink: 0 }}>
            <div className='card-body'>
              <img className='img-fluid rounded-circle reduced-img' src={emp1} alt='emp1' />
              <p className='card-text text-center'>Alvin Kamau</p>
              <p className='card-text text-success'>Employer</p>
              <p className='card-text'>Jobify helps me get an employee just one day after posting the job.</p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className='card text-center' style={{ minWidth: '100%', marginRight: '15px', flexShrink: 0 }}>
            <div className='card-body'>
              <img className='img-fluid rounded-circle reduced-img' src={jb1} alt='jb1' />
              <p className='card-text text-center'>Peterson Omondi</p>
              <p className='card-text text-success'>Job Seeker</p>
              <p className='card-text'>Jobify helped me get a job within a week, after searching for a job for the past 2 years.</p>
            </div>
          </div>

          {/* Testimonial 3 (Optional, for better demonstration) */}
          <div className='card text-center' style={{ minWidth: '100%', marginRight: '15px', flexShrink: 0 }}>
            <div className='card-body'>
              <img className='img-fluid rounded-circle reduced-img' src={emp1} alt='emp1' />
              <p className='card-text text-center'>Mary Wambui</p>
              <p className='card-text text-success'>Employer</p>
              <p className='card-text'>Jobify helped me find the best talent in no time. I will definitely use it again.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Testimonial

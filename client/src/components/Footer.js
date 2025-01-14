import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='footer bg-secondary text-white text-center'>
      <div className='row'>
        <div className='col-md-3 mb-5'>
            <h2 className='fw-bolder'>Jobify</h2>
            <p>The only platform that gurantee jobs </p>
        </div>

        <div className='col-md-3 mb-5'>
            <h2>Quick Links</h2>
            <div className='align-items-center row'>
            <a  className='text-white' href='/'>Home</a>
            <a  className='text-white' href='/jobs'>Jobs</a>
            <a   className='text-white' href='/profile'>Profile</a>
            <a  className='text-white' href='/'>About</a>
            </div>
            </div>
         <div className='col-md-3 mb-5 justify-content-space-between'>
            <h3>Follow Us</h3>
            <FaFacebook size={30} color='blue'/> 
            <FaInstagram  size={30}/>
            <FaLinkedin  size={30} color='blue'/>
            <FaTwitter size={30}/>
            </div>   
          
       <div className='col-md-3 mb-5'>
        <h2 className='fw-bold'>Subscribe</h2>
        <p className='fw-bold'>Subscribe to get notified via email.</p>
        <input type='email' className='mb-3 form-control' /> <button className='btn bg-danger text-white'>Subscribe</button>
       </div>
      </div>
      <div className='text-center mb-5'>
        <h4>Done by: <a  className='text-dark fw-bolder' href='https://abelkoech.vercel.app' target='__blank' rel='noopener norefferer '>Abel Koech</a></h4>
        <p>&copy; 2024- {new Date().getFullYear()} Jobify. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer

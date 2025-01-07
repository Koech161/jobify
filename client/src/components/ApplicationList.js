import React, { useEffect, useState } from 'react'
import api from '../service/api'

const ApplicationList = () => {
    const [applications, setApplications] = useState([])

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const res = await api.get('/applications')
                setApplications(res.data)
            } catch (error) {
                console.error('Error fetching applications', error);
                
            }
        }
        fetchApplication()
    },[])
  return (
    <div style={{marginTop:'100px'}}>
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th className='fw-bolder'>ID</th>
                    <th className='fw-bolder'>Job ID</th>
                    <th className='fw-bolder'>Job Seeker ID</th>
                    <th className='fw-bolder'>Cover Letter</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((appl) => (
                    <tr key={appl.id}>
                        <td>{appl.id}</td>
                        <td>{appl.job_id}</td>
                        <td>{appl.job_seeker_id}</td>
                        <td>{appl.cover_letter}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    </div>
  )
}

export default ApplicationList
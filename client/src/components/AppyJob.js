import React, { useState } from 'react'
import { useAuth } from './AuthProvider'
import * as Yup from 'yup'
import api from '../service/api'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useLocation } from 'react-router-dom'
const AppyJob = () => {
    const {userId, token} = useAuth()
   
    const [error, setError] = useState('')
    const[message, setMessage] = useState('')
    const location = useLocation()
    const job_id = location.state?.job_id
    const initialValues = {
        job_id: job_id,
        job_seeker_id:userId,
        cover_letter: '',
        status:'pending',
        applied_at: new Date().toISOString(),
        resume_url: null

    }
    const validationSchema = Yup.object({
        job_id: Yup.string().required('Job ID is required'),
        job_seeker_id: Yup.string().required('Job Seeker ID is required'),
        cover_letter: Yup.string().required('Cover letter is required'),
        status: Yup.string().required().required('Application status required'),
        applied_at: Yup.date().required('Application date is required'),
        resume_url: Yup.mixed().required('Resume is required')
                        .test('fileSize', 'file too large', value => value && value.size <= 5 * 1024 *1024)
                        .test('fileType', 'Unsuported File Format', value => value && ['application/pdf'].includes(value.type))
    })
    const handleSubmit = async (values, {setSubmitting}) => {
        const formData = new FormData()

        Object.keys(values).forEach(key =>{
            if (key !== 'resume_url'){
                formData.append(key, values[key])
            }
        })
        if (values.resume_url){
            formData.append('resume_url', values.resume_url)
        }
        try {
            const res = await api.post('/applications', formData, {
                headers: {
                    'Content-Type':'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })
            setMessage('Application successfull')
            setError('')
        } catch (error) {
            setError(error.response ? error.response.data: error.message)
        }finally {
            setSubmitting(false)
        }
    }
  return (
    <div className='container justify-content-center align-items-center vh-100 d-flex'>
    <div className='card shadow-sm' style={{width: '40rem'}}>
    <div className='card-body'>
    <h2 className='card-title text-center'>Application Form</h2>
    {message && typeof message === 'string' && <p className='text-success'>{message}</p>}
{message && typeof message === 'object' && message.message && <p className='text-success'>{message.message}</p>}

{error && typeof error === 'string' && <p className='text-danger'>{error}</p>}
{error && typeof error === 'object' && error.message && <p className='text-danger'>{error.message}</p>}


    <Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}>
       
            {({setFieldValue, isSubmitting}) => (
                 <Form>
                
                <div className='mb-3'>
                <Field 
                type='hidden'
                name='job_seeker_id'
                className='form-control'/>
                <ErrorMessage name='job_seeker_id' component='div' className='text-danger'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='cover_letter'>Cover Letter</label>
                <Field
                type='text'
                name='cover_letter'
                className='form-control'/>
                <ErrorMessage name='cover_letter' component='div' className='text-danger'/>
                </div>
                

                <div className='mb-3'>
                    <label htmlFor='resume_url'>Resume</label>
                <input
                type='file'
                name='resume_url'
                className='form-control'
                onChange={(event) => {
                    setFieldValue('resume_url', event.currentTarget.files[0])
                }}/>
                <ErrorMessage name='resume_url' component='div' className='text-danger'/>
                </div>

                <button type='submit' className='btn bg-warning' disabled={isSubmitting}>
                    {isSubmitting? 'Applying...': 'Apply'}
                </button>
                </Form>
            )}
        
    </Formik>

    </div>
        </div>
        </div>
  )
}

export default AppyJob

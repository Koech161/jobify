import React from 'react'
import * as Yup from 'yup'
import api from '../service/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useAuth } from './AuthProvider'
const PostJob = () => {
    const {userId} = useAuth()
    const initialValues = {
      employer_id:userId,
      title: '',
      description: '',
      requirements: '',
      location:'',
      salary_range:'',
      job_type: '',
      posted_at: new Date().toISOString(),
      updated_at: null,
      is_active:true
    }

    const validationSchema = Yup.object().shape({
      employer_id: Yup.string().required('Employer ID is required'),
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      location: Yup.string().required('Location is required'),
      salary_range: Yup.string().required('Salary range is required'),
      job_type: Yup.string().required('Job Type is required'),
      requirements: Yup.string().required('This field is required')

    })

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
      try {
        const res = await api.post('/jobs', values)
        toast.success(res.data.message)
        resetForm()
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to Post a Job'
        toast.error(errorMessage)
      }
      finally{
        setSubmitting(false)
      }
    }

    
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card shadow-sm' style={{width:'40rem'}}>
        <div className='card-body'>
          <h2 className='card-title text-center'>Post a Job</h2>
          <hr />
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
            {({isSubmitting}) => (
              <Form>
                <div className='mb-3'>
                  <label htmlFor='title'>Title</label>
                  <Field
                  type='text'
                  name='title'
                  className='form-control'/>
                  <ErrorMessage name='title' component='div' className='text-danger'/>
                </div>

                <div className='mb-3'>
                  <label htmlFor='description'>Description</label>
                  <Field
                  type='text'
                  name='description'
                  className='form-control'/>
                  <ErrorMessage name='description' component='div' className='text-danger'/>
                </div>

                <div className='mb-3'>
                  <label htmlFor='requirements'>Requirements</label>
                  <Field
                  type='text'
                  name='requirements'
                  className='form-control'/>
                  <ErrorMessage name='requirements' component='div' className='text-danger'/>
                </div>

                <div className='mb-3'>
                  <label htmlFor='location'>Location</label>
                  <Field
                  type='text'
                  name='location'
                  className='form-control'/>
                  <ErrorMessage name='location' component='div' className='text-danger'/>
                </div>

                <div className='mb-3'>
                  <label htmlFor='salary_range'>Salary Range</label>
                  <Field
                  type='text'
                  name='salary_range'
                  className='form-control'/>
                  <ErrorMessage name='salary_range' component='div' className='text-danger'/>
                </div>

                <div className='mb-3'>
                  <label htmlFor='job_type'>Job Type</label>
                  <Field
                  type='text'
                  name='job_type'
                  className='form-control'/>
                  <ErrorMessage name='job_type' component='div' className='text-danger'/>
                </div>

                <button type='submit' className='btn bg-primary text-white '>Post</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PostJob

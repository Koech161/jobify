import React from 'react'
import { ErrorMessage, Field, Form, Formik} from 'formik'
import * as  Yup from 'yup'
import api from '../service/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const initialValues = {
        username: '',
        email: '',
        password:'',
        role: '',
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
        role: Yup.string().required('Role is required'),
    })

    const handleSubmit = async (values, {setSubmiting, resetForm }) => {
        try {
            const res = await api.post('/register', values)
            toast.success(res.data.message )
            resetForm()
            navigate('/login')
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Registration Failed'
            toast.error(errorMessage)
        }finally{
            setSubmiting(false)
        }
    }
  return (
    <div className='conatiner d-flex justify-content-center vh-100 align-items-center'>
        <div className='card shadow-sm' style={{width: '30rem'}}>
            <div className='card-body'>
                <h2 className='card-title text-center'>Sign Up</h2>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='mb-3'>
                                <label htmlFor='username'>Username</label>
                                <Field 
                                type='text'
                                name='username'
                                className='form-control'/>
                                <ErrorMessage name='username' component='div' className='text-danger'/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='email'>Email</label>
                                <Field 
                                type='email'
                                name='email'
                                className='form-control'/>
                                <ErrorMessage name='email' component='div' className='text-danger'/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='password'>Password</label>
                                <Field 
                                type='password'
                                name='password'
                                className='form-control'/>
                                <ErrorMessage name='password' component='div' className='text-danger'/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='role'>Role</label>
                                <Field
                                as='select'
                                name='role'
                                className='form-control'>
                                    <option value='' disabled>select a role</option>
                                    <option value='job_seeker'>Job Seeker</option>
                                    <option value='employer'>Employer</option>
                                </Field>
                                <ErrorMessage name='role' component='div' className='text-danger'/>
                            </div>
                            <button type='submit' className='btn bg-primary text-white w-100' >
                                {isSubmitting?'Signing Up...': 'Sign Up'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
      <ToastContainer />
    </div>
  )
}

export default Register

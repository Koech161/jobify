import React from 'react'
import * as Yup from 'yup'
import api from '../service/api'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const initialValues= {
        email: '',
        password:'',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long')
    })

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        try {
            const res = await api.post('/login', values)
            const {token, userId} = res.data
            login(token, userId)
            toast.success(res.data.message || 'Login successfull!')
            setSubmitting(false)
            resetForm()
            navigate('/')
        } catch (error) {
            console.error(error);
            
            toast.error(error.res?.data?.error|| 'Login failed')
            setSubmitting(false)
            
        }
    }
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
        <div className='card shadow-sm' style={{width:'30rem'}}>
            <div className='card-body'>
                <h2 className='card-title text-center'>Login</h2>
                <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                    {({isSubmitting}) => (
                        <Form>
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
                            <button type='submit' className='btn bg-primary w-100' disabled={isSubmitting}>
                                {isSubmitting?'Logging in...':'Login'}
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

export default Login

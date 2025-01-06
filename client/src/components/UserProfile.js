import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../service/api';
import { useAuth } from './AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const UserProfile = () => {
   
    const { userId } = useAuth();

    // Validation schema using Yup
    const validationSchema = Yup.object({
        user_id: Yup.string().required('User ID is required'),
        bio: Yup.string().required('Bio is required'),
        education: Yup.string().required('Education is required'),
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        phone: Yup.string().required('Phone number is required'),
        profile_picture: Yup.mixed().required('Profile picture is required')
            .test('fileSize', 'File too large', value => value && value.size <= 5 * 1024 * 1024) // 5MB limit
            .test('fileType', 'Unsupported File Format', value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        
        // Append the form fields
        Object.keys(values).forEach(key => {
            if (key !== 'profile_picture') {
                formData.append(key, values[key]);
            }
        });
    
        // Append the profile picture file
        if (values.profile_picture) {
            formData.append('profile_picture', values.profile_picture);  // Make sure the field name matches the backend
        }
    
        try {
            const response = await api.post('/user_profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success
            toast.success('User profile created successfully!');
            
            console.log(response.data);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
            
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='container justify-content-center align-items-center vh-100 d-flex'>
            <div className='card shadow-sm' style={{width: '40rem'}}>
            <div className='card-body'>
            <h2 className='card-title text-center'>User Profile Form</h2>

    

            <Formik
                initialValues={{
                    user_id: userId,
                    bio: '',
                    education: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    profile_picture: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className='mb-3'>
                            <label htmlFor="user_id"></label>
                            <Field
                                type="hidden"
                                id="user_id"
                                name="user_id"
                                className='form-control'
                            />
                            <ErrorMessage name="user_id" component="div" style={{ color: 'red' }} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="bio">Bio</label>
                            <Field
                                type="text"
                                id="bio"
                                name="bio"
                                className='form-control'
                            />
                            <ErrorMessage name="bio" component="div" style={{ color: 'red' }} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="education">Education</label>
                            <Field
                                type="text"
                                id="education"
                                name="education"
                                className='form-control'
                            />
                            <ErrorMessage name="education" component="div" style={{ color: 'red' }} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="first_name">First Name</label>
                            <Field
                                type="text"
                                id="first_name"
                                name="first_name"
                                className='form-control'
                            />
                            <ErrorMessage name="first_name" component="div" style={{ color: 'red' }} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="last_name">Last Name</label>
                            <Field
                                type="text"
                                id="last_name"
                                name="last_name"
                                className='form-control'
                            />
                            <ErrorMessage name="last_name" component="div" style={{ color: 'red' }} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="phone">Phone</label>
                            <Field
                                type="text"
                                id="phone"
                                name="phone"
                                className='form-control'
                            />
                            <ErrorMessage name="phone" component="div" style={{ color: 'red' }} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="profile_picture">Profile Picture</label>
                            <input
                                type="file"
                                id="profile_picture"
                                name="profile_picture"
                                className='form-control'
                                onChange={(event) => {
                                    setFieldValue('profile_picture', event.currentTarget.files[0]);
                                }}
                            />
                            <ErrorMessage name="profile_picture" component="div" style={{ color: 'red' }} />
                        </div>

                        <button type="submit" className='btn w-100 bg-primary text-white' disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update profile'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
        </div>
        <ToastContainer />
        </div>
    );
};

export default UserProfile;

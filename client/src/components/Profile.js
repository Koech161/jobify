import React, { useEffect, useState } from 'react'
import api from '../service/api'
import { useAuth } from './AuthProvider'
import { useUser } from './UserContext'
import verify from '../assets/verified_icon.svg'
import UserProfile from './UserProfile'

const Profile = () => {
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { token } = useAuth()
    const { currentUser } = useUser()

    useEffect(() => {
        const fetch_profile = async () => {
            try {
                const res = await api.get('/user_profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                setProfile(res.data)
                console.log(res.data)
            } catch (error) {
                setError(error.response ? error.response.data : error.message)
            } finally {
                setLoading(false)
            }
        }
        fetch_profile()
    }, [token])

    if (loading) return <div>Loading...</div>
    if (error) return <div className="text-danger">{error.message}</div>

    // Check if profile data is missing or incomplete
    const isProfileIncomplete = !profile.first_name || !profile.last_name || !profile.bio;

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card shadow-sm' style={{ width: '30rem' }}>
                <div className='card-body'>
                    {isProfileIncomplete ? (
                        // If the profile is incomplete, show the UserProfile form
                        <UserProfile />
                    ) : (
                        <>
                            <h2 className='card-title text-center'>
                                {profile.first_name} {profile.last_name} 
                                
                                <img src={verify} alt="Verified" />
                            </h2>
                            <p className='text-center'>@{currentUser.username}</p>
                            <div className='d-flex justify-content-center'>
                                {profile.profile_picture && (
                                    <img
                                        src={profile.profile_picture} 
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover', border:'1px #333'}}
                                        onError={(e) => e.target.src = '/server/files/career-readiness.jpg'} 
                                    />
                                )}
                            </div>
                            <hr />
                            <div className='mb-3'>
                                <strong>Bio:</strong>
                                <p>{profile.bio || 'Not provided'}</p>
                            </div>
                            <div className='mb-3'>
                                <strong>Education:</strong>
                                <p>{profile.education || 'Not provided'}</p>
                            </div>
                            <div className='mb-3'>
                                <strong>Phone:</strong>
                                <p>{profile.phone || 'Not provided'}</p>
                            </div>
                            <button className='btn'>Edit</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile

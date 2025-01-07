import React, { useEffect, useState } from 'react'
import api from '../service/api'

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/user')
                console.log("Users: ", res.data);
              
                setUsers(res.data)
            } catch (error) {
                console.error("Error fetching users: ", error)
            }
        }
        fetchUsers()
    }, [])
  return (
    <div style={{ marginTop: '100px' }}>
            <h2 className='text-center'>Users</h2>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th className='fw-bolder'>ID</th>
                        <th className='fw-bolder'>Username</th>
                        <th className='fw-bolder'>Email</th>
                        <th className='fw-bolder'>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
  )
}

export default UsersList

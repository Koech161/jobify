import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UsersList from './UsersList';
import Job from './Job';
import ApplicationList from './ApplicationList';
import { useUser } from './UserContext';

const EmployerDashboard = () => {
    const {currentUser} = useUser()
    return (
        <div className='bg-dark'>
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-dark p-3 shadow text-white" style={{ width: '200px', position: 'fixed', height: '100vh' }}>
                <h3>Employer Dashboard</h3>
                <ul className="list-unstyled">
                    <li>Welcome {currentUser.username}</li>
                    <li className="mb-3">
                        <Link to="/employer/users" className="text-decoration-none">Users</Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/employer/applications" className="text-decoration-none">Applications</Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/employer/jobs" className="text-decoration-none">Jobs</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="ms-200 p-4" style={{ marginLeft: '200px', flex: 1 }}>
                <Routes>
                    <Route path="users" element={<UsersList />} />
                    <Route path="applications" element={<ApplicationList />} />
                    <Route path="jobs" element={<Job />} />
                </Routes>
            </div>
        </div>
        </div>
    );
};

export default EmployerDashboard;

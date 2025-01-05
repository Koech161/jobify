import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../service/api';
import { useAuth } from './AuthProvider';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const  {token} = useAuth()
    // Fetch notifications when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get('/notifications', {
                    headers: {'Authorization' : `Bearer ${token}`}
                });  // Adjust the API endpoint
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

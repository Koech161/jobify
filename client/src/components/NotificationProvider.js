import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../service/api';
import { useAuth } from './AuthProvider';
import io from 'socket.io-client'
const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const  {token, userId} = useAuth()
    const socket = io('http://127.0.0.1:5555')
    // Fetch notifications when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get('/notifications', {
                    headers: {'Authorization' : `Bearer ${token}`}
                });
                setNotifications(response.data || []);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
        socket.on('new_notification', (notification) => {
            setNotifications(prevNotifications => [notification, ...prevNotifications])
        })
        return () => {
            socket.off('new_notification')
        }
    }, [token, socket]);
    const unreadCount = notifications.filter((notif) => {
        return notif != notif.is_read
    }).length
    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, unreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

import React, { useEffect, useState } from 'react';
import { useNotifications } from './NotificationProvider';
import api from '../service/api';  // Assuming you have an API service for making requests

const Notification = () => {
    const { notifications, setNotifications } = useNotifications();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (notifications) {
            setLoading(false);
        }
    }, [notifications]);

    const handleNotificationClick = async (notifId) => {
        try {
            // Optimistically update the notification status in the frontend
            const updatedNotifications = notifications.map((notif) =>
                notif.id === notifId ? { ...notif, is_read: true } : notif
            );
            setNotifications(updatedNotifications);  // Update state

            // Make an API call to update the 'is_read' status in the backend
            await api.put(`/notifications/${notifId}`, { is_read: true });
        } catch (error) {
            console.error('Error updating notification:', error);

            // Optionally, revert the state if the API call fails
            const revertNotifications = notifications.map((notif) =>
                notif.id === notifId ? { ...notif, is_read: false } : notif
            );
            setNotifications(revertNotifications);  // Revert state on failure
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '100px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            {notifications.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                    No notifications available
                </div>
            ) : (
                notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`alert ${notif.is_read ? 'alert-secondary' : 'alert-info'}`}
                        role="alert"
                        onClick={() => handleNotificationClick(notif.id)}  
                        style={{ cursor: 'pointer' }}
                    >
                        <strong>{notif.is_read ? 'Read' : 'New'} Notification:</strong> {notif.message}
                    </div>
                ))
            )}
        </div>
    );
};

export default Notification;

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import Button from './Button';
import './NotificationDropdown.css';

const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'New Registration', message: 'Alice Smith has registered for "Tech Symposium".', time: '5m ago', type: 'info', read: false },
    { id: 2, title: 'Event Capacity Alert', message: 'Event "Hackathon 2026" is 95% full.', time: '1h ago', type: 'warning', read: false },
    { id: 3, title: 'System Updated', message: 'The dashboard has been updated to v2.1.0.', time: '2h ago', type: 'success', read: true }
];

const NotificationDropdown = ({ isOpen, onClose, toggleButtonId }) => {
    const dropdownRef = useRef(null);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Ignore if the click was on the toggle button itself (handled by Dashboard)
                if (toggleButtonId) {
                    const toggleBtn = document.getElementById(toggleButtonId);
                    if (toggleBtn && toggleBtn.contains(event.target)) {
                        return;
                    }
                }
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, toggleButtonId]);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                    className="notification-dropdown"
                >
                    <div className="notif-header">
                        <h4 className="notif-title">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="notif-badge">
                                    {unreadCount}
                                </span>
                            )}
                        </h4>
                        {unreadCount > 0 && (
                            <button onClick={markAllRead} className="notif-mark-read">
                                <Check size={14} /> Mark all read
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <div className="notif-empty">
                            No notifications right now.
                        </div>
                    ) : (
                        <div className="notif-list">
                            {notifications.map(notif => (
                                <div key={notif.id} className={`notif-card ${!notif.read ? 'unread' : ''}`}>
                                    <div className="notif-card-header">
                                        <span className="notif-card-title">{notif.title}</span>
                                        <button onClick={() => removeNotification(notif.id)} className="notif-close">
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <p className="notif-message">{notif.message}</p>
                                    <span className="notif-time">{notif.time}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationDropdown;

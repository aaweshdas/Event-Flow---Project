import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import Button from './Button';

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
                    className="glass-panel"
                    style={{
                        position: 'absolute',
                        top: '120%',
                        right: '40px',
                        width: '320px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        zIndex: 9999,
                        padding: '1rem',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                            Notifications
                            {unreadCount > 0 && (
                                <span style={{ background: 'var(--primary)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '10px', fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                                    {unreadCount}
                                </span>
                            )}
                        </h4>
                        {unreadCount > 0 && (
                            <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Check size={14} /> Mark all read
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)' }}>
                            No notifications right now.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {notifications.map(notif => (
                                <div key={notif.id} style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    background: notif.read ? 'rgba(255,255,255,0.02)' : 'rgba(var(--primary-rgb), 0.1)',
                                    border: '1px solid',
                                    borderColor: notif.read ? 'rgba(255,255,255,0.05)' : 'var(--primary)',
                                    position: 'relative',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: notif.read ? 500 : 600, color: 'var(--text-primary)' }}>{notif.title}</span>
                                        <button onClick={() => removeNotification(notif.id)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{notif.message}</p>
                                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{notif.time}</span>
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

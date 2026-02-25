import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents } from '../../context/EventContext';
import Button from '../ui/Button';
import { Calendar, Plus, Edit2, Trash2, Eye, X, Image as ImageIcon, MapPin, Clock, Users, Hash } from 'lucide-react';

const ManageEventsTab = () => {
    const { events, createEvent, updateEvent, deleteEvent } = useEvents();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        venue: '',
        category: 'Academic',
        description: '',
        image: '',
        capacity: 50
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenModal = (event = null) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                date: event.date,
                time: event.time,
                venue: event.venue,
                category: event.category,
                description: event.description,
                image: event.image,
                capacity: event.capacity
            });
        } else {
            setEditingEvent(null);
            setFormData({
                title: '',
                date: '',
                time: '',
                venue: '',
                category: 'Academic',
                description: '',
                image: '',
                capacity: 50
            });
        }
        setIsModelOpen(true);
    };

    const handleCloseModal = () => {
        setIsModelOpen(false);
        setEditingEvent(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, formData);
            } else {
                await createEvent(formData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event. Check console for details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
            } catch (error) {
                alert('Failed to delete event.');
            }
        }
    };

    return (
        <motion.div key="admin-manage-events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="section-head" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2><Calendar size={20} /> Manage Events</h2>
                <Button variant="primary" size="sm" onClick={() => handleOpenModal()}><Plus size={14} /> Create Event</Button>
            </div>

            <div className="admin-table-wrap glass-panel">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Registrations</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td className="td-event">
                                    <img src={event.image || 'https://via.placeholder.com/100'} alt="" className="td-img" />
                                    {event.title}
                                </td>
                                <td>{event.date}</td>
                                <td><span className="td-cat">{event.category}</span></td>
                                <td>
                                    <div className="td-bar-wrap">
                                        <div className="td-bar">
                                            <div className="td-fill" style={{ width: `${(event.registered / event.capacity) * 100}%` }}></div>
                                        </div>
                                        <span>{event.registered}/{event.capacity}</span>
                                    </div>
                                </td>
                                <td><span className={event.status === 'Upcoming' ? 'badge-active' : 'badge-inactive'}>{event.status || 'Active'}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenModal(event)}>
                                            <Edit2 size={14} />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)} style={{ color: 'var(--rose-500)' }}>
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {events.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No events found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModelOpen && (
                    <div className="modal-backdrop">
                        <motion.div
                            className="modal-content glass-panel"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{
                                background: 'rgba(20, 20, 30, 0.95)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '2rem',
                                borderRadius: '1rem',
                                width: '100%',
                                maxWidth: '600px',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3>{editingEvent ? 'Edit Event' : 'Create New Event'}</h3>
                                <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="settings-row">
                                    <label>Event Title</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="settings-input" placeholder="E.g., Tech Symposium 2026" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="settings-row">
                                        <label>Date</label>
                                        <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="settings-input" />
                                    </div>
                                    <div className="settings-row">
                                        <label>Time</label>
                                        <input required type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="settings-input" />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="settings-row">
                                        <label>Venue</label>
                                        <input required type="text" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} className="settings-input" placeholder="E.g., Main Auditorium" />
                                    </div>
                                    <div className="settings-row">
                                        <label>Category</label>
                                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="settings-input">
                                            {['Academic', 'Technology', 'Sports', 'Cultural', 'Workshop', 'Seminar', 'Club Activity'].map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="settings-row">
                                        <label>Capacity</label>
                                        <input required type="number" min="1" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })} className="settings-input" />
                                    </div>
                                    <div className="settings-row">
                                        <label>Image URL</label>
                                        <input type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="settings-input" placeholder="https://example.com/image.jpg" />
                                    </div>
                                </div>
                                <div className="settings-row">
                                    <label>Description</label>
                                    <textarea required rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="settings-input" placeholder="Event details..."></textarea>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                    <Button variant="outline" type="button" onClick={handleCloseModal}>Cancel</Button>
                                    <Button variant="primary" type="submit" isLoading={isSubmitting}>
                                        {editingEvent ? 'Save Changes' : 'Create Event'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                }
            `}</style>
        </motion.div>
    );
};

export default ManageEventsTab;

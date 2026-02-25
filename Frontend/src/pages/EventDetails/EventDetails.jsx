import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle, Share2 } from 'lucide-react';
import { api } from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { registerForEvent, isRegistered } = useEvents();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await api.getEventById(id);
                setEvent(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            alert('Please login to register');
            return;
        }
        setRegistering(true);
        try {
            await registerForEvent(id);
            // Re-fetch event to update spots in this view
            const data = await api.getEventById(id);
            setEvent(data);
        } catch (err) {
            alert(err || 'Registration failed');
        } finally {
            setRegistering(false);
        }
    };

    const hasRegistered = isRegistered(id);

    if (loading) return (
        <div className="container py-xl text-center">
            <div className="spinner"></div>
            <p className="mt-4 text-secondary">Loading Event Details...</p>
        </div>
    );

    if (!event) return (
        <div className="container py-xl text-center">
            <h2>Event Not Found</h2>
            <Link to="/dashboard"><Button variant="outline" className="mt-4">Back to Dashboard</Button></Link>
        </div>
    );

    return (
        <div className="event-details-page">
            {/* Hero Header */}
            <div className="event-hero" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)), url(${event.image})` }}>
                <div className="container event-hero-content">
                    <Link to="/dashboard" className="back-link"><ArrowLeft size={20} /> Back</Link>
                    <span className="event-badge">{event.category}</span>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {event.title}
                    </motion.h1>
                    <div className="event-meta-row">
                        <span><Calendar size={18} /> {event.date}</span>
                        <span><Clock size={18} /> {event.time}</span>
                        <span><MapPin size={18} /> {event.venue}</span>
                    </div>
                </div>
            </div>

            <div className="container event-content-layout">
                <main className="event-main">
                    <section className="description-section">
                        <h2>About the Event</h2>
                        <p>{event.description}</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </section>

                    <section className="schedule-section">
                        <h2>Schedule</h2>
                        <div className="schedule-item">
                            <span className="time">09:00 AM</span>
                            <div className="details">
                                <h4>Registrations & Breakfast</h4>
                                <p>Main Lobby</p>
                            </div>
                        </div>
                        <div className="schedule-item">
                            <span className="time">10:00 AM</span>
                            <div className="details">
                                <h4>Keynote Session</h4>
                                <p>Auditorium, Dr. Smith</p>
                            </div>
                        </div>
                    </section>
                </main>

                <aside className="event-sidebar">
                    <Card className="registration-card" hoverEffect={false}>
                        <h3>Registration</h3>
                        <div className="capacity-bar">
                            <div className="bar-fill" style={{ width: `${(event.registered / event.capacity) * 100}%` }}></div>
                        </div>
                        <p className="capacity-text">{event.registered} / {event.capacity} Spots Filled</p>

                        {!hasRegistered ? (
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full mt-4"
                                onClick={handleRegister}
                                isLoading={registering}
                                disabled={event.registered >= event.capacity}
                            >
                                {event.registered >= event.capacity ? 'Sold Out' : 'Register Now'}
                            </Button>
                        ) : (
                            <Button variant="outline" className="w-full mt-4 success-btn" disabled>
                                <CheckCircle size={18} className="mr-2" /> Registered
                            </Button>
                        )}

                        <p className="text-sm text-center mt-3 text-muted">
                            {user ? `Logged in as ${user.name}` : 'Login required to register'}
                        </p>
                    </Card>

                    <Card className="share-card mt-4" hoverEffect={false}>
                        <Button variant="ghost" className="w-full">
                            <Share2 size={18} className="mr-2" /> Share Event
                        </Button>
                    </Card>
                </aside>
            </div>
        </div>
    );
};

export default EventDetails;

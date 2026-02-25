import { motion } from 'framer-motion';
import Hero from '../../components/home/Hero';
import { useEvents } from '../../context/EventContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { events, loading } = useEvents();

    // Show first 3 events as "Featured"
    const featuredEvents = events ? events.slice(0, 3) : [];

    return (
        <div className="home-page">
            <Hero />

            <section className="container py-xl" style={{ paddingBottom: '4rem' }}>
                <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Featured Events</h2>
                    <Link to="/events">
                        <Button variant="ghost">View All <ArrowRight size={16} className="ml-2" /></Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-panel" style={{ height: '400px', opacity: 0.5 }}></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {featuredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full">
                                    <div style={{ height: '200px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                                        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: '600', fontSize: '0.875rem' }}>
                                        {event.category}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{event.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1 }}>
                                        {event.description.substring(0, 80)}...
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <Calendar size={14} /> {event.date} • {event.time}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <MapPin size={14} /> {event.venue}
                                        </div>
                                    </div>
                                    <Link to={`/events/${event.id}`} style={{ marginTop: '1.5rem', display: 'block' }}>
                                        <Button variant="outline" className="w-full">View Details</Button>
                                    </Link>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;

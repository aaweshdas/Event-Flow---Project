import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEvents } from '../../context/EventContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Pagination from '../../components/ui/Pagination';
import { Filter, Search, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Events.css';

const CATEGORIES = ['All', 'Academic', 'Technology', 'Sports', 'Cultural', 'Workshop', 'Seminar', 'Club Activity'];

const Events = () => {
    const { events, loading, error, pagination, filters, updateFilters, fetchEvents } = useEvents();

    // Handle Page Change
    const handlePageChange = (newPage) => {
        fetchEvents(newPage, filters);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle Filter Change
    const handleCategoryChange = (category) => {
        updateFilters({ category });
    };

    // Handle Search
    const handleSearch = (e) => {
        updateFilters({ search: e.target.value });
    };

    return (
        <div className="container events-page">
            <header className="events-header">
                <h1 className="text-gradient">Explore Events</h1>
                <p className="text-secondary">Find workshops, seminars, and activities happening on campus.</p>
            </header>

            <div className="events-layout">
                {/* Sidebar */}
                <aside className="filters-sidebar glass-panel">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={filters.search}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-group">
                        <h3><Filter size={16} /> Categories</h3>
                        <div className="category-list">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`category-btn ${filters.category === cat ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Grid */}
                <main className="events-grid-container">
                    {/* Error State */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="grid-3">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="glass-panel skeleton-card"></div>
                            ))}
                        </div>
                    ) : events.length > 0 ? (
                        <>
                            <div className="grid-3">
                                {events.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="event-card h-full">
                                            <div className="card-image">
                                                <img src={event.image} alt={event.title} />
                                                <span className="card-category">{event.category}</span>
                                            </div>
                                            <div className="card-content">
                                                <h3>{event.title}</h3>
                                                <div className="card-meta">
                                                    <span><Calendar size={14} /> {event.date}</span>
                                                    <span><MapPin size={14} /> {event.venue}</span>
                                                </div>
                                                <Link to={`/events/${event.id}`} className="mt-auto">
                                                    <Button variant="primary" className="w-full mt-4">Details</Button>
                                                </Link>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            <Pagination meta={pagination} onPageChange={handlePageChange} />
                        </>
                    ) : (
                        <div className="no-results">
                            <h3>No events found</h3>
                            <p>Try adjusting your search or filters.</p>
                            <Button variant="outline" onClick={() => updateFilters({ category: 'All', search: '' })}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Events;

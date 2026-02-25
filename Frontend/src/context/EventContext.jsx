import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const EventContext = createContext();

export function EventProvider({ children }) {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [filters, setFilters] = useState({ category: 'All', search: '' });
    const [myRegistrations, setMyRegistrations] = useState([]);

    const fetchEvents = useCallback(async (page = 1, currentFilters = filters) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.getEvents(page, 9, currentFilters);

            setEvents(response.data);
            setPagination(response.meta);
        } catch (err) {
            setError(err.message || 'Failed to fetch events');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const fetchMyRegistrations = useCallback(async () => {
        if (!user || !localStorage.getItem('eventflow_token')) {
            setMyRegistrations([]);
            return;
        }
        try {
            const data = await api.getMyRegistrations();
            setMyRegistrations(data);
        } catch (err) {
            console.error('Failed to fetch user registrations:', err);
        }
    }, [user]);

    // Initial Load
    useEffect(() => {
        fetchEvents(1, filters);
        fetchMyRegistrations();
    }, [fetchEvents, fetchMyRegistrations, filters]);

    const loadMore = () => {
        if (pagination.page < pagination.totalPages) {
            fetchEvents(pagination.page + 1, filters);
        }
    };

    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        // Reset to page 1 when filters change (handled in fetchEvents via dependency/logic if needed, 
        // but here useEffect triggers fetchEvents(1) if filters change? 
        // actually fetchEvents is memoized on filters, so we need to be careful.
        // Better: let the useEffect handle re-fetching when filters change.
    };

    // Explicit effect for filter changes to reset list
    useEffect(() => {
        setEvents([]); // Clear list on filter change
        setPagination(p => ({ ...p, page: 1 }));
        // The main useEffect execution will handle the fetch
    }, [filters]);

    const createEvent = async (eventData) => {
        setLoading(true);
        setError(null);
        try {
            const newEvent = await api.createEvent(eventData);
            setEvents(prev => [newEvent, ...prev]);
            return newEvent;
        } catch (err) {
            setError(err.message || 'Failed to create event');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateEvent = async (id, eventData) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await api.updateEvent(id, eventData);
            setEvents(prev => prev.map(e => e.id === id ? updated : e));
            return updated;
        } catch (err) {
            setError(err.message || 'Failed to update event');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await api.deleteEvent(id);
            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete event');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const registerForEvent = async (eventId) => {
        setError(null);
        try {
            const response = await api.registerForEvent(eventId);
            // Update local event registered count
            setEvents(prev => prev.map(e =>
                e.id === eventId ? { ...e, registered: e.registered + 1 } : e
            ));
            // Update user registrations
            fetchMyRegistrations();
            return response;
        } catch (err) {
            setError(err || 'Failed to register');
            throw err;
        }
    };

    const value = {
        events,
        loading,
        error,
        pagination,
        hasMore: pagination.page < pagination.totalPages,
        loadMore,
        fetchEvents,
        filters,
        updateFilters,
        createEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        myRegistrations,
        isRegistered: (eventId) => myRegistrations.some(r => (r.event?._id || r.event) === eventId)
    };

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
}

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [filters, setFilters] = useState({ category: 'All', search: '' });

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

    // Initial Load
    useEffect(() => {
        fetchEvents(1, filters);
    }, [fetchEvents, filters]);

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

    const value = {
        events,
        loading,
        error,
        pagination,
        hasMore: pagination.page < pagination.totalPages,
        loadMore,
        fetchEvents,
        filters,
        updateFilters
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

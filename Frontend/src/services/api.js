import axiosInstance from './axiosConfig';

export const api = {
    getEvents: async (page = 1, limit = 9, filters = {}) => {
        try {
            // Note: The UI still assumes pagination happens automatically. 
            // We fetch all events from our new endpoint and handle the slicing in the client
            // as a temporary bridge until true backend pagination '?page=1' is added.
            const response = await axiosInstance.get('/events');
            let filtered = response.data;

            if (filters.category && filters.category !== 'All') {
                filtered = filtered.filter(e => e.category === filters.category);
            }
            if (filters.search) {
                const query = filters.search.toLowerCase();
                filtered = filtered.filter(e =>
                    e.title.toLowerCase().includes(query) ||
                    e.description.toLowerCase().includes(query)
                );
            }

            const total = filtered.length;
            const start = (page - 1) * limit;
            const end = start + limit;
            const data = filtered.slice(start, end);

            return {
                data,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error('Failed to fetch events:', error);
            throw error;
        }
    },

    getEventById: async (id) => {
        try {
            const response = await axiosInstance.get(`/events/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch event details:', error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email: credentials.email,
                password: credentials.password // The frontend login.jsx currently uses 'password', we pass it straight through.
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Invalid Credentials');
            }
            throw new Error('Server connectivity issue');
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Registration failed');
        }
    },

    registerForEvent: async (eventId) => {
        try {
            const response = await axiosInstance.post('/registrations', { eventId });
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error.response?.data?.message || 'Registration failed';
        }
    },

    getMyRegistrations: async () => {
        try {
            const response = await axiosInstance.get('/registrations');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user registrations:', error);
            throw error;
        }
    },

    // --- Admin Endpoints ---

    createEvent: async (eventData) => {
        try {
            const response = await axiosInstance.post('/events', eventData);
            return response.data;
        } catch (error) {
            console.error('Failed to create event:', error);
            throw error;
        }
    },

    updateEvent: async (id, eventData) => {
        try {
            const response = await axiosInstance.put(`/events/${id}`, eventData);
            return response.data;
        } catch (error) {
            console.error('Failed to update event:', error);
            throw error;
        }
    },

    deleteEvent: async (id) => {
        try {
            await axiosInstance.delete(`/events/${id}`);
            return { success: true };
        } catch (error) {
            console.error('Failed to delete event:', error);
            throw error;
        }
    },

    getStudents: async () => {
        try {
            const response = await axiosInstance.get('/admin/students');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch students:', error);
            throw error;
        }
    },

    getReports: async () => {
        try {
            const response = await axiosInstance.get('/admin/reports');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch reports:', error);
            throw error;
        }
    }
};

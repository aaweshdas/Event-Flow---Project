import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // e.g., http://localhost:5000/api
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach the token to the header automatically
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const userState = localStorage.getItem('eventflow_token');
        if (userState) {
            config.headers.Authorization = `Bearer ${userState}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle global errors like 401 Unauthorized
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // If we receive a 401 Unauthorized from the backend, 
            // the token has either expired or is invalid.
            console.error('Session expired or unauthorized access.');
            localStorage.removeItem('eventflow_token');
            localStorage.removeItem('eventflow_user');

            // Only force reload if we aren't already actively trying to log in.
            // (A failed login also returns 401).
            if (!error.config.url.includes('/auth/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

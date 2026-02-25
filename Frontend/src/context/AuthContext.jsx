import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Attempt to hydrate user from localStorage on initial load
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('eventflow_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (credentials) => {
        try {
            const userData = await api.login(credentials);

            // Expected backend format: { _id, name, email, role, token }
            // Let's normalize it to match frontend assumptions (id vs _id)
            const normalizedUser = {
                ...userData,
                id: userData._id || userData.id
            };

            // Persist the token for Axios to pick up
            localStorage.setItem('eventflow_token', normalizedUser.token);

            // Persist the user logic for UI hydration
            localStorage.setItem('eventflow_user', JSON.stringify(normalizedUser));

            setUser(normalizedUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const newUser = await api.register(userData);

            // Normalize backend id schema mapping
            const normalizedUser = {
                ...newUser,
                id: newUser._id || newUser.id
            };

            // Persist standard token and object
            localStorage.setItem('eventflow_token', normalizedUser.token);
            localStorage.setItem('eventflow_user', JSON.stringify(normalizedUser));

            setUser(normalizedUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('eventflow_token');
        localStorage.removeItem('eventflow_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

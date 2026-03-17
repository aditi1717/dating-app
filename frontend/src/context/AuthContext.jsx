import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const savedUser = localStorage.getItem('amoro_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('amoro_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('amoro_user');
    };

    const signup = (userData) => {
        // For now, we'll just treat signup like login
        setUser(userData);
        localStorage.setItem('amoro_user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, loading, apiBaseUrl: API_BASE_URL }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

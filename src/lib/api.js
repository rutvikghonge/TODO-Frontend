import axios from 'axios';
import { supabase } from './supabaseClient';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: apiUrl,
});

// Add a request interceptor to attach the Supabase Auth session token
api.interceptors.request.use(
    async (config) => {
        // Get the current session from Supabase client local state
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

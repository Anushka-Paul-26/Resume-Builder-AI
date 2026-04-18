import axios from 'axios';

// This cleans up any hidden newlines or spaces from your environment variable
const baseURL = (import.meta.env.VITE_BASE_URL || "").trim();

const api = axios.create({
    baseURL: baseURL
});

export default api;
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api", // Adjust to your Laravel URL
=======
  baseURL: 'hthttps://medicabinet-backend.up.railway.app/api', // Adjust to your Laravel URL
>>>>>>> 52ea4a9cff4a0192803574b8fa1151db18eb100c
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("profile");
      localStorage.removeItem("medicabinet_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;

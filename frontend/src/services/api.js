// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2060/api", // ✅ Spring Boot backend base URL
});

// ================== AUTH ==================
// Register a new user
export const registerUser = (userData) =>
  API.post("/auth/register", userData);

// Login (fetch by email)
export const loginUser = (email) =>
  API.get("/auth/user", { params: { email } });

// ================== DASHBOARD ==================
// Get dashboard data for a user
export const getDashboardData = (userId) =>
  API.get(`/dashboard/${userId}`);

// ================== BOOKINGS ==================
// Create a new booking
export const createBooking = (bookingData) =>
  API.post("/bookings", bookingData);

// Get all bookings
export const getBookings = () => API.get("/bookings");

// Get bookings by user
export const getBookingsByUser = (userId) =>
  API.get(`/bookings/user/${userId}`);

// Delete a booking
export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);

// ================== PROFILE ==================
// Get user profile
export const getProfile = (userId) =>
  API.get(`/users/${userId}`);

// Update user profile (name, password, etc.)
export const updateProfile = (userId, userData) =>
  API.put(`/users/${userId}`, userData);

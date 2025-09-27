import axios from "axios";
import { ENDPOINTS } from "./config";

// ------------------ AUTH ------------------

// Register a new user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(ENDPOINTS.register, data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(ENDPOINTS.login, data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Update user profile
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${ENDPOINTS.updateUser}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

// ------------------ BOOKINGS ------------------

// Get all bookings
export const getBookings = async () => {
  try {
    const response = await axios.get(ENDPOINTS.bookings);
    return response.data;
  } catch (error) {
    console.error("Get bookings error:", error);
    throw error;
  }
};

// Create a booking
export const createBooking = async (data) => {
  try {
    const response = await axios.post(ENDPOINTS.bookings, data);
    return response.data;
  } catch (error) {
    console.error("Create booking error:", error);
    throw error;
  }
};

// Delete a booking
export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINTS.bookings}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete booking error:", error);
    throw error;
  }
};

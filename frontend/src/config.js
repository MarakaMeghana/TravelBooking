export const API_BASE_URL = "http://localhost:2040/api";

export const ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  updateUser: `${API_BASE_URL}/auth/update`, // for updating user profile
  bookings: `${API_BASE_URL}/bookings`,      // for booking operations
};

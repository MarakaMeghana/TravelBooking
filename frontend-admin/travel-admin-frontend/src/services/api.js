import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // your Spring Boot backend
});

export const loginUser = (email, password) => {
  return API.post("/auth/login", { email, password });
};

// Admin CRUD APIs
export const getFlights = (token) => API.get("/admin/flights", { headers: { Authorization: `Bearer ${token}` } });
export const createFlight = (flight, token) => API.post("/admin/flights", flight, { headers: { Authorization: `Bearer ${token}` } });
export const updateFlight = (id, flight, token) => API.put(`/admin/flights/${id}`, flight, { headers: { Authorization: `Bearer ${token}` } });
export const deleteFlight = (id, token) => API.delete(`/admin/flights/${id}`, { headers: { Authorization: `Bearer ${token}` } });

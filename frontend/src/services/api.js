import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2060/api", // backend URL
});

// Register a new user
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Find user by email
export const getUserByEmail = async (email) => {
  const response = await API.get(`/auth/user?email=${email}`);
  return response.data;
};

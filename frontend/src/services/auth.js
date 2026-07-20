import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_BASE_URL}/login`, loginData);

  // Save token and user details
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("username", response.data.username);
  localStorage.setItem("email", response.data.email);
  localStorage.setItem("role", response.data.role);

  return response.data;
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
};

// Check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get JWT Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get User Role
export const getRole = () => {
  return localStorage.getItem("role");
};
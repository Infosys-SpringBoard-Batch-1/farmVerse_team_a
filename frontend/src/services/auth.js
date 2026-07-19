// src/services/auth.js

import api from "./api";

/**
 * Register User
 */
export async function registerUser(data) {
  try {
    const response = await api.post("/api/auth/register", data);

    const user = response.data;

    // Store user details after successful registration (optional)
    localStorage.setItem("jwtToken", user.token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);

    return {
      status: "ok",
      data: user,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error.response?.data ||
        "Registration failed",
    };
  }
}

/**
 * Login User
 */
export async function loginUser(data) {
  try {
    const response = await api.post("/api/auth/login", data);

    const user = response.data;

    // Save login details
    localStorage.setItem("jwtToken", user.token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);

    return {
      status: "ok",
      data: user,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error.response?.data ||
        "Invalid username or password",
    };
  }
}

/**
 * Logout User
 */
export function logoutUser() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
}
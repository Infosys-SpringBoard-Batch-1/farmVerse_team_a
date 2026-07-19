// src/services/auth.js

import api from "./api";

export async function registerUser(data) {
  try {
    const response = await api.post("/auth/register", data);

    return {
      status: "ok",
      data: response.data,
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

export async function loginUser(data) {
  try {
    const response = await api.post("/auth/login", data);

    const user = response.data;

    localStorage.setItem("jwtToken", user.token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);

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

export function logoutUser() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
}
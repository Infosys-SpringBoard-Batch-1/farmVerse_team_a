// src/services/auth.js

export async function registerUser(data) {
  console.log("Register Payload:", data);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    status: "ok",
    statusCode: 200,
    message: "User registered successfully",
  };
}

export async function loginUser(data) {
  console.log("Login Payload:", data);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fake JWT for frontend testing
  localStorage.setItem("jwtToken", "fake-jwt-token");

  return {
    status: "ok",
    statusCode: 200,
    message: "Login successful",
    jwtToken: "fake-jwt-token",
  };
}

export function logoutUser() {
  localStorage.removeItem("jwtToken");
}
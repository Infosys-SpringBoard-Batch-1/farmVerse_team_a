// src/services/auth.js

export async function registerUser(data) {
  console.log("========== REGISTER REQUEST ==========");
  console.log("Payload:", {
    username: data.username,
    email: data.email,
    password: data.password,
  });

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    status: "ok",
    statusCode: 200,
    message: "User registered successfully",
  };
}

export async function loginUser(data) {
  console.log("========== LOGIN REQUEST ==========");
  console.log("Payload:", {
    email: data.email,
    password: data.password,
  });

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fake JWT Token for frontend testing
  const fakeToken = "fake-jwt-token";

  localStorage.setItem("jwtToken", fakeToken);

  return {
    status: "ok",
    statusCode: 200,
    message: "Login successful",
    jwtToken: fakeToken,
  };
}

export function logoutUser() {
  localStorage.removeItem("jwtToken");
}
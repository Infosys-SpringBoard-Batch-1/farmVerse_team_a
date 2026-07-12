import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSeedling,
} from "react-icons/fa";

import {
  validateEmail,
  validatePassword,
  validateUsername,
  passwordsMatch,
} from "../../utils/validation";

import { registerUser } from "../../services/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isUsernameValid = validateUsername(formData.username);

  const isEmailValid = validateEmail(formData.email);

  const isPasswordValid = validatePassword(formData.password);

  const isConfirmPasswordValid = passwordsMatch(
    formData.password,
    formData.confirmPassword
  );

  const isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);

    // Registration Payload
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    console.log("Registration Payload:", payload);

    const response = await registerUser(payload);

    setLoading(false);

    if (response.status === "ok") {
      alert("User Registered Successfully");
      navigate("/login");
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">

        <div className="flex justify-center">

          <div className="bg-green-600 p-4 rounded-full">

            <FaSeedling className="text-white text-3xl" />

          </div>

        </div>

        <h1 className="text-4xl font-bold text-center mt-6">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Register to continue
        </p>

        <form
          className="mt-10 space-y-6"
          onSubmit={handleSubmit}
        >
                    {/* Username */}

          <div>

            <label className="font-medium">
              Username
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <FaUser className="text-gray-400" />

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-4 outline-none"
              />

            </div>

            {!isUsernameValid && formData.username !== "" && (
              <p className="text-red-500 text-sm mt-2">
                Username must contain at least 3 characters.
              </p>
            )}

          </div>

          {/* Email */}

          <div>

            <label className="font-medium">
              Email
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 outline-none"
              />

            </div>

            {!isEmailValid && formData.email !== "" && (
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid email address.
              </p>
            )}

          </div>

          {/* Password */}

          <div>

            <label className="font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <FaLock className="text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 outline-none"
              />

            </div>

            {!isPasswordValid && formData.password !== "" && (
              <p className="text-red-500 text-sm mt-2">
                Password must be at least 8 characters and include uppercase,
                lowercase, a number, and a special character.
              </p>
            )}

          </div>
                    {/* Confirm Password */}

          <div>

            <label className="font-medium">
              Confirm Password
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <FaLock className="text-gray-400" />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-4 outline-none"
              />

            </div>

            {!isConfirmPasswordValid &&
              formData.confirmPassword !== "" && (
                <p className="text-red-500 text-sm mt-2">
                  Passwords do not match.
                </p>
              )}

          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-4 rounded-xl font-semibold transition ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Login Link */}

        <p className="text-center mt-8 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-green-700 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
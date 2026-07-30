import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSeedling,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import {
  validateEmail,
  validatePassword,
  validateUsername,
  passwordsMatch,
} from "../../utils/validation";

import { registerFarmer } from "../../services/auth";

function Register() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("FARMER");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFullNameValid =
    formData.fullName.trim().length >= 3;

  const isUsernameValid =
    validateUsername(formData.username);

  const isEmailValid =
    validateEmail(formData.email);

  const isPasswordValid =
    validatePassword(formData.password);

  const isConfirmPasswordValid =
    passwordsMatch(
      formData.password,
      formData.confirmPassword
    );

  const isFormValid =
    isFullNameValid &&
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRole === "ADMIN") {
      alert(
        "Admin accounts cannot be created through registration."
      );
      return;
    }

    if (!isFormValid) return;

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,

        // IMPORTANT
        role: selectedRole,
      };

      await registerFarmer(payload);

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data ||
        "Registration Failed."
      );
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-green-600 p-5 rounded-full shadow-lg">
            <FaSeedling className="text-white text-4xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mt-6">
          Create Your FarmVerse Account
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Join the Smart Agriculture Platform
        </p>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          {/* Farmer */}
          <div
            onClick={() => setSelectedRole("FARMER")}
            className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${
              selectedRole === "FARMER"
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <FaSeedling className="text-3xl text-green-600 mb-3" />

            <h2 className="font-bold text-lg">
              Farmer
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Register as a Farmer to manage farms,
              crops, weather and analytics.
            </p>
          </div>

          {/* Admin */}
          <div
            onClick={() => setSelectedRole("ADMIN")}
            className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${
              selectedRole === "ADMIN"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <FaUserShield className="text-3xl text-blue-600 mb-3" />

            <h2 className="font-bold text-lg">
              Admin
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Admin accounts are created only by
              the system administrator.
            </p>
          </div>
        </div>

        {selectedRole === "ADMIN" && (
          <div className="mt-6 rounded-xl bg-yellow-100 border border-yellow-300 p-4">
            <p className="font-semibold text-yellow-800">
              Admin Registration Disabled
            </p>

            <p className="text-sm text-yellow-700 mt-2">
              Please contact the administrator to
              obtain an Admin account.
            </p>
          </div>
        )}

        {selectedRole === "FARMER" && (

          <form
            className="space-y-5 mt-8"
            onSubmit={handleSubmit}
          >

            {/* Full Name */}
            <div>
              <label className="font-medium">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                />
              </div>

              {!isFullNameValid &&
                formData.fullName !== "" && (
                  <p className="text-red-500 text-sm mt-2">
                    Full name must contain at least
                    3 characters.
                  </p>
              )}
            </div>

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
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                />
              </div>

              {!isUsernameValid &&
                formData.username !== "" && (
                  <p className="text-red-500 text-sm mt-2">
                    Username must be at least
                    3 characters.
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

              {!isEmailValid &&
                formData.email !== "" && (
                  <p className="text-red-500 text-sm mt-2">
                    Enter a valid email address.
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>

              {!isPasswordValid &&
                formData.password !== "" && (
                  <p className="text-red-500 text-sm mt-2">
                    Password must contain an uppercase
                    letter, lowercase letter, number,
                    special character and be at least
                    8 characters.
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
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>

              {!isConfirmPasswordValid &&
                formData.confirmPassword !== "" && (
                  <p className="text-red-500 text-sm mt-2">
                    Passwords do not match.
                  </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-4 rounded-xl font-semibold transition ${
                loading
                  ? "bg-green-400 text-white cursor-wait"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>
        )}

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-600">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaSeedling,
} from "react-icons/fa";

import { loginUser } from "../../services/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "FARMER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isUsernameValid = formData.username.trim().length >= 3;
  const isPasswordValid = formData.password.trim().length > 0;

  const isFormValid = isUsernameValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);

    try {
      const response = await loginUser({
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });

      setLoading(false);

      alert("Login Successful!");

      if (response.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/farmer/dashboard");
      }

    } catch (error) {
      setLoading(false);

      alert(
        error.response?.data?.message ||
        "Invalid username or password!"
      );
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
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Login to continue
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
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-4 outline-none"
              />
            </div>

            {!isUsernameValid &&
              formData.username !== "" && (
                <p className="text-red-500 text-sm mt-2">
                  Username must be at least 3 characters.
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 outline-none"
              />
            </div>

            {!isPasswordValid &&
              formData.password !== "" && (
                <p className="text-red-500 text-sm mt-2">
                  Password is required.
                </p>
              )}
          </div>

          {/* Role */}
          <div>
            <label className="font-medium">
              Login As
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-2 p-4 border rounded-xl outline-none"
            >
              <option value="FARMER">
                Farmer
              </option>

              <option value="ADMIN">
                Admin
              </option>
            </select>
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-4 rounded-xl font-semibold transition ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?

          <Link
            to="/register"
            className="text-green-700 font-semibold ml-2 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSeedling,
} from "react-icons/fa";

import { validateEmail } from "../../utils/validation";
import { loginUser } from "../../services/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isEmailValid = validateEmail(formData.email);
  const isPasswordValid = formData.password.length > 0;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);

    const response = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (response.status === "ok") {
      alert("Login Successful");

      navigate("/dashboard");
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

          Welcome Back

        </h1>

        <p className="text-center text-gray-500 mt-3">

          Login to continue

        </p>

        <form
          className="mt-10 space-y-6"
          onSubmit={handleSubmit}
        >
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 outline-none"
              />

            </div>

            {!isPasswordValid && formData.password !== "" && (
              <p className="text-red-500 text-sm mt-2">
                Password is required.
              </p>
            )}

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
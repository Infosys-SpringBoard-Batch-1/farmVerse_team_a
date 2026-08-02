import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  FaUser,
  FaLock,
  FaSeedling,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import { loginUser } from "../../services/auth";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [selectedRole, setSelectedRole] = useState("FARMER");

  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("roleMismatch") === "true") {
    alert(
      "This Google account is registered as a different role. Please select the correct role."
    );
  }

  if (params.get("googleError") === "true") {
    alert("Google login failed. Please try again.");
  }
}, []);

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let temp = {};

    if (!formData.username.trim()) {
      temp.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      temp.username =
        "Username must contain at least 3 characters";
    }

    if (!formData.password.trim()) {
      temp.password = "Password is required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

const handleGoogleLogin = () => {

    localStorage.setItem("selectedRole", selectedRole);

    window.location.href =
        `http://localhost:8080/oauth2/authorization/google?prompt=select_account&role=${selectedRole}`;
};

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await loginUser({
        username: formData.username.trim(),
        password: formData.password,
        role: selectedRole,
      });

      if (!rememberMe) {
        setFormData({
          username: "",
          password: "",
        });
      }

      if (response.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/farmer/dashboard");
      }
    } catch (error) {
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    (typeof error.response?.data === "string"
      ? error.response.data
      : null) ||
    error.message ||
    "Invalid username or password.";

  alert(message);
} finally {
      setLoading(false);
    }
  };
    return (

    <div className="h-screen bg-gradient-to-br from-green-100 via-white to-emerald-100 flex items-center justify-center overflow-hidden">

      <div className="w-full max-w-6xl h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}

        <div className="hidden lg:flex bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white flex-col justify-center items-center p-10">

          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-2xl">

            <FaSeedling className="text-green-600 text-6xl"/>

          </div>

          <h1 className="text-5xl font-bold mt-8">

            FarmVerse

          </h1>

          <p className="text-xl mt-4">

            Smart Agriculture Platform

          </p>

         <p className="text-center text-lg leading-8 max-w-md text-green-50 mt-10">
  Grow smarter with AI-powered insights,
  <br />
  real-time weather updates, and intelligent
  <br />
  farm management—all in one place.
</p>
        </div>
                {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-8 lg:p-10 overflow-y-auto">

          <div className="w-full max-w-md">

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue to FarmVerse
            </p>

            {/* Role Selection */}

            <div className="grid grid-cols-2 gap-4 mt-8">
                          <div
                onClick={() => setSelectedRole("FARMER")}
                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 hover:shadow-lg ${
                  selectedRole === "FARMER"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <FaSeedling className="text-3xl text-green-600 mb-3" />

                <h3 className="font-bold text-lg">
                  Farmer
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                  Manage crops, weather,
                  irrigation and reports.
                </p>

              </div>
                            <div
                onClick={() => setSelectedRole("ADMIN")}
                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 hover:shadow-lg ${
                  selectedRole === "ADMIN"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <FaUserShield className="text-3xl text-blue-600 mb-3" />

                <h3 className="font-bold text-lg">
                  Admin
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                  Manage users,
                  analytics and platform.
                </p>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="space-y-5 mt-8"
            >             {/* Username */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Username
                </label>

                <div
                  className={`flex items-center border-2 rounded-xl transition ${
                    errors.username
                      ? "border-red-500"
                      : "border-gray-300 focus-within:border-green-600"
                  }`}
                >
                  <div className="px-4">
                    <FaUser className="text-gray-400" />
                  </div>

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full py-3 pr-4 outline-none rounded-r-xl"
                  />
                </div>

                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username}
                  </p>
                )}

              </div>
                            {/* Password */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Password
                </label>

                <div
                  className={`flex items-center border-2 rounded-xl transition ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 focus-within:border-green-600"
                  }`}
                >

                  <div className="px-4">
                    <FaLock className="text-gray-400"/>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full py-3 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-gray-500 hover:text-green-600"
                  >
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </button>

                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </p>
                )}

              </div>
                            <div className="flex justify-between items-center">

                <label className="flex items-center gap-2 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="accent-green-600"
                  />

                  Remember Me

                </label>

                <button
    type="button"
    onClick={() => navigate("/forgot-password")}
    className="text-sm text-green-600 hover:underline"
>
    Forgot Password?
</button>

              </div>
                            <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full border-2 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
>
                <FcGoogle className="text-2xl"/>

                Continue with Google

              </button>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  loading
                    ? "bg-green-400 text-white cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {loading ? "Signing In..." : "Login"}

              </button>
                          </form>

            <div className="text-center mt-6">

              <p className="text-gray-600">

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

        </div>

      </div>

    </div>

  );

}

export default Login;
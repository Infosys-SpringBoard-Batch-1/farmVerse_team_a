import { useState } from "react"; import { Link, useNavigate } from "react-router-dom"; import { FaUser, FaEnvelope, FaLock, FaSeedling, FaEye, FaEyeSlash, FaUserShield, } from "react-icons/fa"; import { validateEmail, validatePassword, validateUsername, passwordsMatch, } from "../../utils/validation"; import { registerFarmer } from "../../services/auth"; function Register() { const navigate = useNavigate(); const [selectedRole, setSelectedRole] = useState("FARMER"); const [showPassword, setShowPassword] = useState(false); const [showConfirmPassword, setShowConfirmPassword] = useState(false); const [loading, setLoading] = useState(false); const [formData, setFormData] = useState({ fullName: "", username: "", email: "", password: "", confirmPassword: "", }); const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value, }); }; const isFullNameValid = formData.fullName.trim().length >= 3; const isUsernameValid = validateUsername(formData.username); const isEmailValid = validateEmail(formData.email); const isPasswordValid = validatePassword(formData.password); const isConfirmPasswordValid = passwordsMatch( formData.password, formData.confirmPassword ); const isFormValid = isFullNameValid && isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid; const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRole === "ADMIN") {
      // Temporarily enabled for setup
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

      const errorData = error.response?.data;
      const errorMessage = typeof errorData === 'string'
        ? errorData
        : errorData?.message || "Registration Failed.";

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="h-screen bg-slate-50 flex justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-emerald-600 to-teal-800 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0"></div>
      
      <div className="w-full max-w-xl h-full max-h-[95vh] bg-white rounded-3xl shadow-2xl p-10 relative z-10 overflow-y-auto">

        {/* Logo */}
        <div className="flex justify-center mb-2">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-5 rounded-2xl shadow-lg shadow-emerald-500/30">
            <FaSeedling className="text-white text-4xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mt-6 text-gray-800 tracking-tight">
          Create Your Account
        </h1>

        <p className="text-center text-gray-500 mt-3 text-lg">
          Join the Smart Agriculture Platform
        </p>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {/* Farmer */}
          <div onClick={() => setSelectedRole("FARMER")} className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-md ${ selectedRole === "FARMER" ? "border-emerald-500 bg-emerald-50 shadow-emerald-100 shadow-inner" : "border-gray-100 bg-gray-50 hover:bg-gray-100/80" }`} >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${selectedRole === "FARMER" ? "bg-emerald-100 text-emerald-600" : "bg-white text-gray-400 shadow-sm"}`}>
              <FaSeedling className="text-2xl" />
            </div>

            <h2 className={`font-bold text-lg mb-1 ${selectedRole === "FARMER" ? "text-emerald-800" : "text-gray-700"}`}>
              Farmer
            </h2>

            <p className={`text-xs leading-relaxed ${selectedRole === "FARMER" ? "text-emerald-600/80" : "text-gray-500"}`}>
              Register as a Farmer to manage farms, crops, weather and analytics.
            </p>
          </div>

          {/* Admin */}
          <div onClick={() => setSelectedRole("ADMIN")} className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-md ${ selectedRole === "ADMIN" ? "border-blue-500 bg-blue-50 shadow-blue-100 shadow-inner" : "border-gray-100 bg-gray-50 hover:bg-gray-100/80" }`} >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${selectedRole === "ADMIN" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-400 shadow-sm"}`}>
              <FaUserShield className="text-2xl" />
            </div>

            <h2 className={`font-bold text-lg mb-1 ${selectedRole === "ADMIN" ? "text-blue-800" : "text-gray-700"}`}>
              Admin
            </h2>

            <p className={`text-xs leading-relaxed ${selectedRole === "ADMIN" ? "text-blue-600/80" : "text-gray-500"}`}>
              Admin accounts are created only by the system administrator.
            </p>
          </div>
        </div>

        {/* Temporarily rendering the form for both Farmer and Admin */}
        {(selectedRole === "FARMER" || selectedRole === "ADMIN") && (
          <form className="space-y-6 mt-8" onSubmit={handleSubmit} >
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>

              <div className={`flex items-center border-2 rounded-xl bg-white transition-all ${ (!isFullNameValid && formData.fullName !== "") ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50" }`} >
                <div className="pl-4 pr-3 py-4">
                  <FaUser className={(!isFullNameValid && formData.fullName !== "") ? "text-red-400" : "text-gray-400"} />
                </div>
                <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className="w-full py-4 outline-none bg-transparent font-medium text-gray-800 placeholder-gray-400" />
              </div>

              {!isFullNameValid && formData.fullName !== "" && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    Full name must contain at least 3 characters.
                  </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Username
              </label>

              <div className={`flex items-center border-2 rounded-xl bg-white transition-all ${ (!isUsernameValid && formData.username !== "") ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50" }`} >
                <div className="pl-4 pr-3 py-4">
                  <FaUser className={(!isUsernameValid && formData.username !== "") ? "text-red-400" : "text-gray-400"} />
                </div>
                <input type="text" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} className="w-full py-4 outline-none bg-transparent font-medium text-gray-800 placeholder-gray-400" />
              </div>

              {!isUsernameValid && formData.username !== "" && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    Username must be at least 3 characters.
                  </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <div className={`flex items-center border-2 rounded-xl bg-white transition-all ${ (!isEmailValid && formData.email !== "") ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50" }`} >
                <div className="pl-4 pr-3 py-4">
                  <FaEnvelope className={(!isEmailValid && formData.email !== "") ? "text-red-400" : "text-gray-400"} />
                </div>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full py-4 outline-none bg-transparent font-medium text-gray-800 placeholder-gray-400" />
              </div>

              {!isEmailValid && formData.email !== "" && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    Enter a valid email address.
                  </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>

              <div className={`flex items-center border-2 rounded-xl bg-white transition-all ${ (!isPasswordValid && formData.password !== "") ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50" }`} >
                <div className="pl-4 pr-3 py-4">
                  <FaLock className={(!isPasswordValid && formData.password !== "") ? "text-red-400" : "text-gray-400"} />
                </div>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} className="w-full py-4 outline-none bg-transparent font-medium text-gray-800 placeholder-gray-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-4 py-4 text-gray-400 hover:text-emerald-600 transition-colors" >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {!isPasswordValid && formData.password !== "" && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    Password must contain an uppercase letter, lowercase letter, number, special character and be at least 8 characters.
                  </p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className={`flex items-center border-2 rounded-xl bg-white transition-all ${ (!isConfirmPasswordValid && formData.confirmPassword !== "") ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50" }`} >
                <div className="pl-4 pr-3 py-4">
                  <FaLock className={(!isConfirmPasswordValid && formData.confirmPassword !== "") ? "text-red-400" : "text-gray-400"} />
                </div>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} className="w-full py-4 outline-none bg-transparent font-medium text-gray-800 placeholder-gray-400" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="px-4 py-4 text-gray-400 hover:text-emerald-600 transition-colors" >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {!isConfirmPasswordValid && formData.confirmPassword !== "" && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    Passwords do not match.
                  </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button type="submit" disabled={!isFormValid || loading} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${ !isFormValid || loading ? "bg-gray-300 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-emerald-500/30 hover:-translate-y-1" }`} >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : "Create Account"}
              </button>
            </div>
          </form>
        )}

        {/* Login Link */}
        <p className="text-center mt-10 text-gray-600 font-medium">
          Already have an account?
          <Link to="/login" className="ml-2 text-emerald-600 font-bold hover:text-emerald-700 hover:underline" >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
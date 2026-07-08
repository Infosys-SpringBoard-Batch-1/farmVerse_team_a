import { Link } from "react-router-dom";
import { FaSeedling, FaBars } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg shadow-md">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="bg-green-600 p-3 rounded-xl shadow-lg">

            <FaSeedling className="text-white text-2xl" />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-800">
              FarmVerse
            </h1>

            <p className="text-xs text-gray-500">
              Precision Agriculture Platform
            </p>

          </div>

        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-10">

          <a
            href="#"
            className="font-medium text-slate-700 hover:text-green-600 transition"
          >
            Home
          </a>

          <a
            href="#features"
            className="font-medium text-slate-700 hover:text-green-600 transition"
          >
            Features
          </a>

          <a
            href="#"
            className="font-medium text-slate-700 hover:text-green-600 transition"
          >
            About
          </a>

          <a
            href="#"
            className="font-medium text-slate-700 hover:text-green-600 transition"
          >
            Contact
          </a>

        </nav>

        {/* Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <Link
            to="/login"
            className="border border-green-600 text-green-700 px-6 py-3 rounded-xl hover:bg-green-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition shadow-lg"
          >
            Register
          </Link>

        </div>

        {/* Mobile Menu Icon */}

        <button className="lg:hidden text-2xl text-slate-700">

          <FaBars />

        </button>

      </div>

    </header>
  );
}

export default Navbar;
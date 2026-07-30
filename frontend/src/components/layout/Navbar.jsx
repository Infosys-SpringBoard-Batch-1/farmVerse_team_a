import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const username = user.username || "User";
  const role = user.role || "FARMER";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white shadow-md px-8 py-5 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {username} 👋
        </h1>

        <p className="text-gray-500 mt-1">
          {today}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative">
          <FaBell className="text-2xl text-gray-600 hover:text-green-700 transition" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
            0
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-green-700" />

          <div>
            <p className="font-semibold">
              {username}
            </p>

            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {role}
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
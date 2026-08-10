import { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaCheckDouble,
  FaTrash
} from "react-icons/fa";
import { useNotifications } from "../../hooks/useNotifications";

function Navbar() {

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const username = user.username || "User";
  const role = user.role || "FARMER";

  const { notifications, unreadCount, markAllAsRead, clearAll } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 ">
          Welcome, {username} <span className="animate-pulse inline-block">👋</span>
        </h1>

        <p className="text-gray-500 mt-1 font-medium">
          {today}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <div className="relative">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setShowNotifs(!showNotifs)} >
            <FaBell className="text-2xl text-gray-600 hover:text-green-600 transition" /> {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold border-2 border-white shadow-sm animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-3 w-80 bg-white border shadow-2xl rounded-2xl z-50 overflow-hidden transform origin-top-right transition-all">
              <div className="p-4 bg-gray-50 flex justify-between items-center border-b ">
                <h3 className="font-bold text-gray-800 ">Notifications</h3>
                <div className="flex gap-3 text-sm">
                  <button onClick={markAllAsRead} className="text-blue-600 hover:underline flex items-center gap-1" title="Mark all as read">
                    <FaCheckDouble /> Read
                  </button>
                  <button onClick={clearAll} className="text-red-600 hover:underline flex items-center gap-1" title="Clear all">
                    <FaTrash /> Clear
                  </button>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 ">
                    No notifications yet.
                  </div>
                ) : (
                  <ul className="divide-y "> {notifications.map((n) => (
                      <li key={n.id} className={`p-4 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-blue-50/50 ' : ''}`}>
                        <p className="text-sm text-gray-800 ">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(n.time).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l ">

          <FaUserCircle className="text-4xl text-green-600 " />

          <div>
            <p className="font-semibold text-gray-800 ">
              {username}
            </p>

            <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {role}
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
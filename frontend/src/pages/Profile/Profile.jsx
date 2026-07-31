import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTractor,
  FaEdit,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fullName = user.fullName || user.username || "User";
  const username = user.username || "User";
  const email = user.email || "Not Available";
  const role = user.role || "FARMER";

  // Temporary values until backend provides them
  const phone = user.phone || "Not Available";
  const location = user.location || "Not Available";
  const farms = user.farms || 0;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-gray-800">
            My Profile
          </h1>

          <p className="text-gray-500 text-xl mt-2">
            Manage your personal information.
          </p>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => navigate("/profile/edit")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-md transition"
        >
          <FaEdit />
          Edit Profile
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Card */}
        <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
          <FaUserCircle className="text-green-600 text-9xl" />

          <h2 className="text-4xl font-bold mt-6">
            {fullName}
          </h2>

          <p className="text-xl text-gray-500 mt-2">
            {role}
          </p>

          <div className="mt-6 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
            @{username}
          </div>
        </div>

        {/* Right Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-8">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 mb-2">Full Name</p>
              <h3 className="text-2xl font-semibold">
                {fullName}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Email</p>
              <h3 className="text-2xl font-semibold flex items-center gap-3">
                <FaEnvelope />
                {email}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Phone</p>
              <h3 className="text-2xl font-semibold flex items-center gap-3">
                <FaPhone />
                {phone}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Location</p>
              <h3 className="text-2xl font-semibold flex items-center gap-3">
                <FaMapMarkerAlt />
                {location}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Registered Farms</p>
              <h3 className="text-2xl font-semibold flex items-center gap-3">
                <FaTractor />
                {farms}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Role</p>

              <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
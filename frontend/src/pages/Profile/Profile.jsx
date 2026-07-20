import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaTractor,
} from "react-icons/fa";

function Profile() {
  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information.
          </p>

        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-3">

          <FaEdit />

          Edit Profile

        </button>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

          <FaUserCircle
            size={140}
            className="mx-auto text-green-600"
          />

          <h2 className="text-3xl font-bold mt-6">
            Ananya C Y
          </h2>

          <p className="text-gray-500">
            Frontend Developer
          </p>

        </div>

        {/* Right */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-8">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-gray-500">
                Full Name
              </p>

              <h3 className="text-xl font-semibold mt-2">
                Ananya C Y
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Email
              </p>

              <h3 className="text-xl font-semibold mt-2 flex items-center gap-2">

                <FaEnvelope />

                ananya@email.com

              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Phone
              </p>

              <h3 className="text-xl font-semibold mt-2 flex items-center gap-2">

                <FaPhone />

                +91 9876543210

              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Location
              </p>

              <h3 className="text-xl font-semibold mt-2 flex items-center gap-2">

                <FaMapMarkerAlt />

                Bengaluru

              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Farms
              </p>

              <h3 className="text-xl font-semibold mt-2 flex items-center gap-2">

                <FaTractor />

                12 Registered

              </h3>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Profile;
import DashboardLayout from "../../components/layout/DashboardLayout";

function Settings() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Settings
      </h1>

      <div className="space-y-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Settings
          </h2>

          <div className="space-y-6">

            <div className="flex justify-between">

              <span>Email Notifications</span>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex justify-between">

              <span>SMS Notifications</span>

              <input type="checkbox" />

            </div>

            <div className="flex justify-between">

              <span>AI Recommendations</span>

              <input type="checkbox" defaultChecked />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Security
          </h2>

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl">

            Change Password

          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Settings;
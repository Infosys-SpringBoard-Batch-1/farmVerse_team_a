import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <div className="flex-1 flex flex-col">

        {/* Topbar */}

        <Topbar />

        {/* Main Content */}

        <main className="flex-1 p-8 overflow-y-auto">

          {children}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
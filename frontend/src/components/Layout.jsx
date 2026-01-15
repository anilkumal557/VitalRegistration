import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-dvh w-screen overflow-hidden flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <header className="h-16 shrink-0 overflow-hidden z-40">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main */}
        <main className="flex-1 overflow-hidden bg-white dark:bg-gray-800">
          <div className="h-80% w-full overflow-hidden p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

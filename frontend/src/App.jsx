import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Register from "./pages/Register"; // Make sure this is imported
import Dashboard from "./pages/Dashboard";
import Birth from "./pages/Birth";
import Marriage from "./pages/Marriage";
import Death from "./pages/Death";
import Migration from "./pages/Migration";

const App = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      {user && (
        <>
          <Navbar onMenuClick={() => setOpen(!open)} />
          <div className="flex">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <main className="flex-1 p-4 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/birth" element={<Birth />} />
                <Route path="/marriage" element={<Marriage />} />
                <Route path="/death" element={<Death />} />
                <Route path="/migration" element={<Migration />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </>
      )}

      {!user && (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Any other path redirects to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;

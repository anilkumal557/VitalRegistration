import { useEffect, useState, useContext } from "react";
import { FiSun, FiMoon, FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { logout } = useContext(AuthContext);

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 🔥 Sync theme with Tailwind
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav className="w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl text-gray-700 dark:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <FiMenu />
        </button>

        <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          e-Governance
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200"
        >
          {dark ? <FiSun /> : <FiMoon />}
        </button>

        {/* Profile */}
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200">
          <FiUser />
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
        >
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

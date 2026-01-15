import { NavLink } from "react-router-dom";
import {
  FiX,
  FiHome,
  FiUserCheck,
  FiHeart,
  FiFileText,
  FiRepeat,
} from "react-icons/fi";

const Sidebar = ({ open, onClose }) => {
  const links = [
    { to: "/dashboard", name: "Dashboard", icon: <FiHome /> },
    { to: "/birth", name: "Birth", icon: <FiUserCheck /> },
    { to: "/marriage", name: "Marriage", icon: <FiHeart /> },
    { to: "/death", name: "Death", icon: <FiFileText /> },
    { to: "/migration", name: "Migration", icon: <FiRepeat /> },
  ];

  const linkBase =
    "flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200";

  return (
    <>
      {/* ===== Mobile Overlay ===== */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 md:shadow-none
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Menu
          </span>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 text-2xl"
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-3 space-y-1">
          {links.map(({ to, name, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `
                ${linkBase}
                text-gray-700 dark:text-gray-200
                hover:bg-blue-100 dark:hover:bg-gray-800
                ${
                  isActive
                    ? "bg-blue-200 dark:bg-blue-700 font-semibold"
                    : ""
                }
              `
              }
              onClick={onClose} // closes sidebar on mobile navigation
            >
              <span className="text-lg">{icon}</span>
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

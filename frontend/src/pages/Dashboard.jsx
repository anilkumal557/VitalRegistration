import { Link } from "react-router-dom";
import { FiUser, FiHeart, FiActivity, FiMapPin } from "react-icons/fi";

const Dashboard = () => {
  const cards = [
    { title: "Birth Certificates", icon: <FiUser />, link: "/birth", color: "blue" },
    { title: "Marriage Certificates", icon: <FiHeart />, link: "/marriage", color: "pink" },
    { title: "Death Certificates", icon: <FiActivity />, link: "/death", color: "gray" },
    { title: "Migration Certificates", icon: <FiMapPin />, link: "/migration", color: "green" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition transform hover:-translate-y-1`}
          >
            <div
              className={`text-${card.color}-500 dark:text-${card.color}-400 text-4xl mb-4`}
            >
              {card.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {card.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

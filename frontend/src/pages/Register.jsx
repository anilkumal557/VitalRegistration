import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios.js";
import { HiOutlineMail, HiLockClosed, HiUser } from "react-icons/hi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      alert(data.message || "Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Register for E-Governance
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Request access to the Digital Civil Registration System
          </p>
        </div>

        {/* Info Box */}
        <div className="mb-5 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
          Fill in your details below to create an account.
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-900 focus-within:border-blue-500">
              <HiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-900 focus-within:border-blue-500">
              <HiOutlineMail className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="example@gov.in"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-900 focus-within:border-blue-500">
              <HiLockClosed className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="********"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-900 focus-within:border-blue-500">
              <HiLockClosed className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="********"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium transition"
          >
            Register
          </button>

          {/* Login Link */}
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600 dark:text-gray-400">
              Already have an account?
            </span>{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Login
            </Link>
          </div>

        </form>

        {/* Footer */}
        <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
          This is a secure government system. Unauthorized access is prohibited.
          <br />
          © {new Date().getFullYear()} Ministry of Digital Governance
        </div>

      </div>
    </div>
  );
};

export default Register;

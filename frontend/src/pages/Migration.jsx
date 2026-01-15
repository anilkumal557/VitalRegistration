import { useState, useEffect } from "react";
import API from "../api/axios.js";
import { FiUser, FiMapPin, FiCheck, FiX, FiClipboard } from "react-icons/fi";

const Migration = () => {
  const [migrations, setMigrations] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    fromAddress: "",
    toAddress: "",
    reason: ""
  });

  const fetchMigrations = async () => {
    try {
      const { data } = await API.get("/migration");
      setMigrations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMigrations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/migration", form);
      setForm({ fullName: "", fromAddress: "", toAddress: "", reason: "" });
      fetchMigrations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/migration/${id}/approve`);
      fetchMigrations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    const remarks = prompt("Enter remarks for rejection:");
    if (!remarks) return;
    try {
      await API.put(`/migration/${id}/reject`, { remarks });
      fetchMigrations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Migration Certificates
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"
      >
        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="From Address"
          value={form.fromAddress}
          onChange={e => setForm({ ...form, fromAddress: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="To Address"
          value={form.toAddress}
          onChange={e => setForm({ ...form, toAddress: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Reason"
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Apply
        </button>
      </form>

      {/* Migration List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {migrations.map((m) => (
          <div
            key={m._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-1">
              <FiUser /> {m.fullName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FiMapPin /> From: {m.fromAddress}
            </p>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FiMapPin /> To: {m.toAddress}
            </p>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FiClipboard /> {m.reason}
            </p>
            <p
              className={`mt-2 font-semibold ${
                m.status === "approved"
                  ? "text-green-600 dark:text-green-400"
                  : m.status === "rejected"
                  ? "text-red-600 dark:text-red-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              Status: {m.status}
            </p>

            {m.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleApprove(m._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded-md transition"
                >
                  <FiCheck /> Approve
                </button>
                <button
                  onClick={() => handleReject(m._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded-md transition"
                >
                  <FiX /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Migration;

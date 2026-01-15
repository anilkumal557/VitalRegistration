import { useState, useEffect } from "react";
import API from "../api/axios.js";
import { FiCalendar, FiMapPin, FiUser, FiCheck, FiX } from "react-icons/fi";

const Death = () => {
  const [deaths, setDeaths] = useState([]);
  const [form, setForm] = useState({
    deceasedName: "",
    dateOfDeath: "",
    causeOfDeath: "",
    placeOfDeath: ""
  });

  const fetchDeaths = async () => {
    try {
      const { data } = await API.get("/death");
      setDeaths(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeaths();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/death", form);
      setForm({ deceasedName: "", dateOfDeath: "", causeOfDeath: "", placeOfDeath: "" });
      fetchDeaths();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/death/${id}/approve`);
      fetchDeaths();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    const remarks = prompt("Enter remarks for rejection:");
    if (!remarks) return;
    try {
      await API.put(`/death/${id}/reject`, { remarks });
      fetchDeaths();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Death Certificates
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"
      >
        <input
          placeholder="Deceased Name"
          value={form.deceasedName}
          onChange={e => setForm({ ...form, deceasedName: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          placeholder="Date of Death"
          value={form.dateOfDeath}
          onChange={e => setForm({ ...form, dateOfDeath: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Cause of Death"
          value={form.causeOfDeath}
          onChange={e => setForm({ ...form, causeOfDeath: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Place of Death"
          value={form.placeOfDeath}
          onChange={e => setForm({ ...form, placeOfDeath: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Apply
        </button>
      </form>

      {/* Death List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deaths.map((d) => (
          <div
            key={d._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              <FiUser className="inline mr-1" />
              {d.deceasedName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FiCalendar /> {d.dateOfDeath}
            </p>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FiMapPin /> {d.placeOfDeath}
            </p>
            <p className="text-gray-600 dark:text-gray-300">{d.causeOfDeath}</p>
            <p
              className={`mt-2 font-semibold ${
                d.status === "approved"
                  ? "text-green-600 dark:text-green-400"
                  : d.status === "rejected"
                  ? "text-red-600 dark:text-red-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              Status: {d.status}
            </p>

            {d.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleApprove(d._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded-md transition"
                >
                  <FiCheck /> Approve
                </button>
                <button
                  onClick={() => handleReject(d._id)}
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

export default Death;

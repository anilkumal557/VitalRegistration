import { useState, useEffect } from "react";
import API from "../api/axios.js";
import { FiCheck, FiX, FiCalendar, FiMapPin, FiUser } from "react-icons/fi";

const Marriage = () => {
  const [marriages, setMarriages] = useState([]);
  const [form, setForm] = useState({
    groomName: "",
    brideName: "",
    marriageDate: "",
    marriagePlace: ""
  });

  const fetchMarriages = async () => {
    try {
      const { data } = await API.get("/marriage");
      setMarriages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMarriages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/marriage", form);
      setForm({ groomName: "", brideName: "", marriageDate: "", marriagePlace: "" });
      fetchMarriages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/marriage/${id}/approve`);
      fetchMarriages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    const remarks = prompt("Enter remarks for rejection:");
    if (!remarks) return;
    try {
      await API.put(`/marriage/${id}/reject`, { remarks });
      fetchMarriages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Marriage Certificates
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"
      >
        <input
          placeholder="Groom Name"
          value={form.groomName}
          onChange={e => setForm({ ...form, groomName: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Bride Name"
          value={form.brideName}
          onChange={e => setForm({ ...form, brideName: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          placeholder="Marriage Date"
          value={form.marriageDate}
          onChange={e => setForm({ ...form, marriageDate: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Marriage Place"
          value={form.marriagePlace}
          onChange={e => setForm({ ...form, marriagePlace: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Apply
        </button>
      </form>

      {/* Marriage List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marriages.map((m) => (
          <div
            key={m._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              <FiUser className="inline mr-1" />
              {m.groomName} & {m.brideName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FiCalendar /> {m.marriageDate}
            </p>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FiMapPin /> {m.marriagePlace}
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

export default Marriage;

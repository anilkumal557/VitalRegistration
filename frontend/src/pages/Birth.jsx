import { useState, useEffect } from "react";
import API from "../api/axios.js";

const Birth = () => {
  const [births, setBirths] = useState([]);
  const [form, setForm] = useState({
    childName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    placeOfBirth: ""
  });

  const fetchBirths = async () => {
    try {
      const { data } = await API.get("/birth");
      setBirths(data);
    } catch (error) {
      console.error("Error fetching births:", error);
    }
  };

  useEffect(() => {
    fetchBirths();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/birth", form);
      setForm({
        childName: "",
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        placeOfBirth: ""
      });
      fetchBirths();
    } catch (error) {
      console.error("Error submitting birth form:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Birth Certificates
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"
      >
        <input
          placeholder="Child Name"
          value={form.childName}
          onChange={e => setForm({ ...form, childName: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Father Name"
          value={form.fatherName}
          onChange={e => setForm({ ...form, fatherName: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Mother Name"
          value={form.motherName}
          onChange={e => setForm({ ...form, motherName: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={form.dateOfBirth}
          onChange={e => setForm({ ...form, dateOfBirth: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Place of Birth"
          value={form.placeOfBirth}
          onChange={e => setForm({ ...form, placeOfBirth: e.target.value })}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Apply
        </button>
      </form>

      {/* Birth List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {births.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {b.childName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Father: {b.fatherName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Mother: {b.motherName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Date of Birth: {b.dateOfBirth}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Place of Birth: {b.placeOfBirth}
            </p>
            <p
              className={`mt-2 font-semibold ${
                b.status === "approved"
                  ? "text-green-600 dark:text-green-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              Status: {b.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Birth;

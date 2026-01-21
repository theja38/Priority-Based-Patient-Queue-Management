import { useState } from "react";
import axios from "axios";

export default function StaffDashboard() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(false);
  const [message, setMessage] = useState("");

  const registerPatient = async () => {
    if (!name) {
      setMessage("Patient name required");
      return;
    }

    await axios.post("http://localhost:5000/register", {
      name,
      priority,
    });

    setName("");
    setPriority(false);
    setMessage("Patient registered successfully");
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="relative mb-8">
          <h1 className="text-3xl font-extrabold text-center text-slate-800">
            Priority-Based Patient Queue Management
          </h1>

          <button
            onClick={logout}
            className="absolute right-0 top-0 text-red-500 text-sm"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold text-center text-green-700 mb-6">
          Staff Dashboard
        </h2>

        {/* Registration Form */}
        <div className="space-y-5">
          <input
            className="w-full border p-3 rounded"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="flex items-center gap-3 text-gray-700">
            <input
              type="checkbox"
              checked={priority}
              onChange={(e) => setPriority(e.target.checked)}
            />
            Emergency Case
          </label>

          <button
            onClick={registerPatient}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700"
          >
            Register Patient
          </button>

          {message && (
            <p className="text-center text-gray-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

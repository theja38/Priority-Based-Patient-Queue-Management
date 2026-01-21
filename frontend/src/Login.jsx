import { useState } from "react";
import axios from "axios";

export default function Login({ setRole }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        { username, password }
      );

      if (res.data.role !== selectedRole) {
        setError("Please select the correct role");
        return;
      }

      localStorage.setItem("token", res.data.token);
      setRole(res.data.role);
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">

        {/* MAIN HEADING */}
        <h1 className="text-3xl font-extrabold text-center mb-10 text-slate-800 tracking-wide">
  Priority-Based Patient Queue Management
</h1>



        {/* ROLE SELECTION */}
        {!selectedRole && (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedRole("doctor")}
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            >
              Login as Doctor
            </button>

            <button
              onClick={() => setSelectedRole("staff")}
              className="w-full py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700"
            >
              Login as Staff
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {selectedRole && (
          <>
            <h2 className="text-xl font-semibold text-center mt-6 mb-4">
              {selectedRole === "doctor" ? "Doctor Login" : "Staff Login"}
            </h2>

            <input
              className="w-full border p-3 rounded mb-4"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="w-full border p-3 rounded mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700"
            >
              Login
            </button>

            {error && (
              <p className="text-red-500 text-center mt-3">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

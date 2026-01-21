import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function DoctorDashboard() {
  const [queue, setQueue] = useState({
    current: null,
    next: null,
    waitingCount: 0,
  });

  const [avgTime, setAvgTime] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("queueUpdate", (data) => {
      setQueue(data);
    });

    fetchAverageTime();

    return () => socket.disconnect();
  }, []);

  const fetchAverageTime = async () => {
    const res = await axios.get(
      "http://localhost:5000/average-waiting-time"
    );
    setAvgTime(res.data.averageWaitingTime);
  };

  const completeConsultation = async () => {
    if (!queue.current) return;

    await axios.put(
      `http://localhost:5000/complete/${queue.current._id}`
    );

    fetchAverageTime();
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

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

        <h2 className="text-xl font-semibold text-center text-blue-700 mb-6">
          Doctor Dashboard
        </h2>

        <div className="bg-blue-50 border rounded-xl p-6 space-y-3 text-gray-700">
          <p>
            <strong>Current Patient:</strong>
            {queue.current
              ? ` Token ${queue.current.token} – ${queue.current.name}`
              : " None"}
          </p>

          <p>
            <strong>Next Patient:</strong>
            {queue.next
              ? ` Token ${queue.next.token} – ${queue.next.name}`
              : " None"}
          </p>

          <p>
            <strong>Waiting Count:</strong> {queue.waitingCount}
          </p>

          <p>
            <strong>Average Waiting Time:</strong> {avgTime} minutes
          </p>
        </div>

        <button
          onClick={completeConsultation}
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Complete Consultation
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function PatientDisplay() {
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
    const res = await fetch(
      "http://localhost:5000/average-waiting-time"
    );
    const data = await res.json();
    setAvgTime(data.averageWaitingTime);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-black text-white flex items-center justify-center">
      <div className="text-center space-y-8">

        <h1 className="text-5xl font-extrabold tracking-wide">
          Priority-Based Patient Queue Management
        </h1>

        <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
          <p className="text-xl mb-2">Current Token</p>
          <p className="text-8xl font-bold text-green-400">
            {queue.current ? queue.current.token : "--"}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-lg">Next Token</p>
          <p className="text-5xl font-semibold text-yellow-400">
            {queue.next ? queue.next.token : "--"}
          </p>
        </div>

        <div className="text-lg">
          <p>Waiting Count: {queue.waitingCount}</p>
          <p className="mt-1">
            Average Waiting Time: {avgTime} minutes
          </p>
        </div>
      </div>
    </div>
  );
}

import { apiClient } from "../services/apiClient.js";
import { useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa6"; 
import { FaTrophy } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
export const PlayerStatsCard = () => {
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayerMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient("/games/me/metrics", {
          method: "GET",
        });

        const res = await response.json();

        if (!response.ok) throw new Error(res.msg || "Failed to fetch metrics");

        setMetrics(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPlayerMetrics();
  }, []);


  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#1E293B] p-6 shadow-lg shadow-black/30 border border-white/5 m-3">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-[#F8FAFC] mb-6">Your Stats</h2>

        {loading && <div className="text-gray-300 mt-4">Loading...</div>}

        {error && (
          <div className="w-full bg-red-500 text-white p-2 rounded-2xl">
            {<p className="text-center">{error}</p>}
          </div>
        )}

        {metrics ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#1F2937] p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <FaTrophy className="text-yellow-500 text-2xl" />
                <span className="font-semibold text-gray-200">Best WPM</span>
              </div>
              <div className="text-3xl text-[#3B82F6] font-bold">{metrics.bestWPM || "N/A"}</div>
            </div>

            <div className="flex items-center justify-between bg-[#1F2937] p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <FaChartLine  className="text-green-400 text-2xl" />
                <span className="font-semibold text-gray-200">Avg WPM</span>
              </div>
              <div className="text-3xl text-[#3B82F6] font-bold">{metrics.avgWPM || "N/A"}</div>
            </div>

            <div className="flex items-center justify-between bg-[#1F2937] p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <IoIosStats className="text-teal-400 text-2xl" />
                <span className="font-semibold text-gray-200">Avg Accuracy</span>
              </div>
              <div className="text-3xl text-[#3B82F6] font-bold">{metrics.avgAccuracy || "N/A"}%</div>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-gray-300">
            <p>No data available yet. Keep playing to track your stats!</p>
          </div>
        )}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../services/apiClient.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { FaTrophy, FaChartLine, FaRegFileAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import "../services/chartSetup.js";
export const TextStatsPage = () => {
  const { textId } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const getTextMetrics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient(`/texts/${textId}/metrics`, {
          method: "GET",
        });

        const res = await response.json();
        if (!response.ok)
          throw new Error(res.msg || "Failed getting the stats of the text");

        setMetrics(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTextMetrics();
  }, [textId]);


  const barChartData = {
    labels: ["WPM"],
    datasets: [
      {
        label: "Best WPM",
        data: [metrics.bestWPM ?? 0],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 8,
      },
      {
        label: "Average WPM",
        data: [metrics.avgWPM ?? 0],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 8,
      },
      {
        label: "Median WPM",
        data: [metrics.medianWPM ?? 0],
        backgroundColor: "rgba(34, 211, 238, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#E5E7EB",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#E5E7EB" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#E5E7EB" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  const accuracy = metrics.avgAccuracy ?? 0;

  const doughnutData = {
    labels: ["Accuracy", "Errors"],
    datasets: [
      {
        data: [accuracy, 100 - accuracy],
        backgroundColor: [
          "rgba(34, 197, 94, 0.85)",
          "rgba(239, 68, 68, 0.9)"
        ],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        labels: { color: "#E5E7EB" },
      },
    },
  };


  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#1E293B] p-6 shadow-lg shadow-black/30 border border-white/5 m-3">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-[#F8FAFC] mb-6">
          Text Statistics
        </h2>

        {loading && <p className="text-gray-300">Loading...</p>}

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-xl mb-4">
            <p className="text-center">{error}</p>
          </div>
        )}

        {metrics.textContent && (
          <div className="space-y-6">
            <div className="bg-[#1F2937] p-4 rounded-xl shadow-xl">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <FaRegFileAlt />
                Text
              </h3>
              <p className="text-gray-200">{metrics.textContent}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1F2937] p-6 rounded-xl shadow-xl">
                <h3 className="font-semibold text-gray-200 mb-4">
                  WPM Comparison
                </h3>
                <Bar data={barChartData} options={barOptions} />
              </div>

              <div className="bg-[#1F2937] p-6 rounded-xl shadow-xl flex flex-col items-center justify-center">
                <h3 className="font-semibold text-gray-200 mb-4">
                  Average Accuracy
                </h3>

                <div className="w-56 h-56">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>

                <span className="mt-4 text-2xl font-bold text-green-400">
                  {accuracy.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                icon={<FaTrophy className="text-yellow-400 text-2xl" />}
                label="Best WPM"
                value={`${metrics.bestWPM} WPM`}
              />
              <StatCard
                icon={<FaChartLine className="text-green-400 text-2xl" />}
                label="Average WPM"
                value={`${metrics.avgWPM?.toFixed(1)} WPM`}
              />
              <StatCard
                icon={<IoIosStats className="text-teal-400 text-2xl" />}
                label="Median WPM"
                value={`${metrics.medianWPM} WPM`}
              />
              <StatCard
                icon={<FaRegFileAlt className="text-blue-400 text-2xl" />}
                label="Average Accuracy"
                value={`${accuracy.toFixed(1)}%`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-[#1F2937] p-4 rounded-xl shadow-xl">
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-gray-200 font-semibold">{value}</p>
    </div>
    {icon}
  </div>
);

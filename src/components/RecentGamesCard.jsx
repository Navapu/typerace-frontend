import { apiClient } from "../services/apiClient.js";
import { useEffect, useState } from "react";
import { FaTrophy, FaChartLine } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

export const RecentGamesCard = () => {
  const [error, setError] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getGamesHistory = async () => {
      try {
        setLoading(true);
        const response = await apiClient(`/games/me/history?page=${currentPage}&limit=3`, {
          method: "GET",
        });

        const res = await response.json();

        if (!response.ok) throw new Error(res.msg || "Failed to fetch game history");

        setGames(res.data.games);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getGamesHistory();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#1E293B] p-6 shadow-lg shadow-black/30 border border-white/5 m-3">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-[#F8FAFC] mb-6">Game History</h2>

        {loading && <div className="text-gray-300 mt-4">Loading...</div>}

        {error && (
          <div className="w-full bg-red-500 text-white p-2 rounded-2xl">
            <p className="text-center">There was an error fetching your game history.</p>
          </div>
        )}

        {games.length > 0 ? (
          <div className="space-y-6">
            {games.map((game) => (
              <div key={game._id} className="flex items-center justify-between bg-[#1F2937] p-4 rounded-xl shadow-xl hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-200">Mode: {game.mode}</span>
                  <span className="font-semibold text-gray-200">Difficulty: {game.difficulty}</span>
                  <span className="font-semibold text-gray-200">Started: {new Date(game.startedAt).toLocaleString()}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <FaTrophy className="text-yellow-500 text-2xl" />
                    <span className="text-gray-200">Raw WPM: {game.rawWPM}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaChartLine className="text-green-400 text-2xl" />
                    <span className="text-gray-200">Adjusted WPM: {game.adjustedWPM}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoIosStats className="text-teal-400 text-2xl" />
                    <span className="text-gray-200">Accuracy: {game.accuracy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 text-gray-300">
            <p>No games played yet.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-4 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-500">
              Prev
            </button>
            <span className="text-gray-300">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-500">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

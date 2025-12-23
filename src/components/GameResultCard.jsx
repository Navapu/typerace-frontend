// GameResultCard.jsx
export const GameResultCard = ({ gameData, onClose }) => {
  if (!gameData) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#1E293B] rounded-2xl shadow-2xl p-6 max-w-md w-full text-white z-10 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">🎉 Your Results</h2>

        <div className="space-y-2">
          <p>⏱ Duration: {gameData.duration.toFixed(2)}s</p>
          <p>✅ Accuracy: {(gameData.accuracy)}%</p>
          <p>✍️ Characters typed: {gameData.charactersTyped}</p>
          <p>❌ Characters wrong: {gameData.charactersWrong}</p>
          <p>⚡ Raw WPM: {gameData.rawWPM.toFixed(2)}</p>
          <p>⚡ Adjusted WPM: {gameData.adjustedWPM.toFixed(2)}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

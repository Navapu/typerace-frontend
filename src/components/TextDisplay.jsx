export const TextDisplay = ({textContent, typedText, gameState}) => {
    const showCursor = gameState === "idle" || gameState === "playing";
  return (
    <div className="w-full max-w-4xl bg-[#1E293B] rounded-2xl p-6 shadow-lg shadow-black/30 border border-white/5">
      <div className="text-gray-400 text-lg leading-relaxed font-mono whitespace-pre-wrap">

        {textContent.split("").map((letter, index) => {
            const typedLetter = typedText[index];
            let colorClass = "text-gray-400";
            if (typedLetter != null) {
                 colorClass = typedLetter === letter ? "text-green-300" : "text-red-400";
            }

            const isCursor = showCursor && index === typedText.length;
          return (
            <span
              key={index}
              className={`relative transition-colors duration-150 ${colorClass} ${
                isCursor? "text-white border-b-2 border-blue-400 animate-pulse": ""}`}>
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
}
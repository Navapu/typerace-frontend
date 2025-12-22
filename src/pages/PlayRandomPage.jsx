import { useEffect, useState } from "react";
import { apiClient } from "../services/apiClient.js";
import { TextDisplay } from "../components/TextDisplay.jsx";
import { TypingInput } from "../components/TypingInput.jsx";
export const PlayRandomPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [language, setLanguage] = useState("en");
  const [typedText, setTypedText] = useState("");
  const [gameState, setGameState] = useState("idle");
  useEffect(() => {
    const getRandomText = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient(
          `/texts/random?difficulty=${difficulty}&language=${language}`,
          { method: "GET" }
        );
        const res = await response.json();
        if (!response.ok) throw new Error(res.msg || "Get random text failed");
        setText(res.data);
        setTypedText("");
        setGameState("idle");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRandomText();
  }, [difficulty, language]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-[#0F172A]">
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setDifficulty("easy")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
            difficulty === "easy"
              ? "bg-blue-500 border-2 border-white/20"
              : "bg-[#1E293B] hover:bg-blue-500"
          } text-white`}
        >
          Easy
        </button>

        <button
          onClick={() => setDifficulty("medium")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
            difficulty === "medium"
              ? "bg-blue-500 border-2 border-white/20"
              : "bg-[#1E293B] hover:bg-blue-500"
          } text-white`}
        >
          Medium
        </button>

        <button
          onClick={() => setDifficulty("hard")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
            difficulty === "hard"
              ? "bg-blue-500 border-2 border-white/20"
              : "bg-[#1E293B] hover:bg-blue-500"
          } text-white`}
        >
          Hard
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
            language === "en"
              ? "bg-cyan-500 border-2 border-white/20"
              : "bg-[#1E293B] hover:bg-cyan-500"
          } text-white`}
        >
          English
        </button>

        <button
          onClick={() => setLanguage("es")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
            language === "es"
              ? "bg-cyan-500 border-2 border-white/20"
              : "bg-[#1E293B] hover:bg-cyan-500"
          } text-white`}
        >
          Spanish
        </button>
      </div>

      <div className="w-full max-w-4xl bg-[#1E293B] rounded-2xl p-6 shadow-lg shadow-black/30 border border-white/5">
        {loading && <p className="text-gray-300">Loading...</p>}
        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-xl text-center">
            {error}
          </div>
        )}
        {!loading && !error && text && (
          <TextDisplay textContent={text.content} typedText={typedText} gameState={gameState}/>
        )}        
        <TypingInput
          textContent={text.content}
          typedText={typedText}
          setTypedText={setTypedText}
          gameState={gameState}
          setGameState={setGameState}
          />
      </div>      
    </div>
  );
};

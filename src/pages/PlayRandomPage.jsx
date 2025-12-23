import { useEffect, useState } from "react";
import { apiClient } from "../services/apiClient.js";
import { TextDisplay } from "../components/TextDisplay.jsx";
import { TypingInput } from "../components/TypingInput.jsx";
import { GameResultCard } from "../components/GameResultCard.jsx";
export const PlayRandomPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [language, setLanguage] = useState("en");
  const [typedText, setTypedText] = useState("");
  const [gameState, setGameState] = useState("idle");
  const [seconds, setSeconds] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [finishedAt, setfinishedAt] = useState(null);
  const [gameData, setGameData] = useState({});
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
        setSeconds(0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRandomText();
  }, [difficulty, language]);

  useEffect(() => {

  }, [typedText, text]);

  useEffect (() => {
    if (!text?.content) return;
    if(typedText.length === text.content.length){
      setGameState("finished");
      setfinishedAt(Date.now());
    }
  }, [typedText, text.content])

  useEffect(() => {
    if(gameState === "playing"){
        const intervalId = setInterval(() => {
          setSeconds(prev => prev + 1);
        }, 1000);

      return () => clearInterval(intervalId);
    }
    const handleFinish = async () => {
      if (gameState === "finished") {
        const result = calculateGameResult();
          try {
            await sendGameDataToBackend(result);
          } catch (error) {
            console.error(error);
          }
      }
    };
  handleFinish();
  }, [gameState])

  const calculateGameResult = () => {
    let correct = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === text.content[i]) correct++;
    }

    const charactersCorrect = correct
    const durationSeconds = Math.max((finishedAt - startedAt) / 1000, 1);
    const charactersTyped = typedText.length;
    const charactersWrong = charactersTyped - charactersCorrect;
    const accuracy = charactersCorrect / charactersTyped * 100
    const rawWPM = (charactersTyped / 5) / (durationSeconds / 60)
    const adjustedWPM = (charactersCorrect / 5) / (durationSeconds / 60)
    return({
      charactersTyped,
      charactersCorrect,
      charactersWrong,
      accuracy,
      rawWPM,
      adjustedWPM,
      duration: durationSeconds,
      startedAt,
      finishedAt,
      mode: "normal",
      difficulty,
      textId: text._id
    });
  }

  const sendGameDataToBackend = async(result) => {
    try{
      const response = await apiClient('/games/save', {
        method: 'POST',
        body: JSON.stringify(result)
      })
      if (!response.ok) throw new Error("Failed to save game results");
      const res = await response.json();
      setGameData(res.data)
    }catch(error){
      setError(error.message)
    }
  }
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
      <div className="mb-4 flex justify-center">
        <div
        className={`px-4 py-2 rounded-xl font-mono text-lg tracking-widest
        bg-[#020617] border border-white/10 text-cyan-300 shadow-inner
        ${gameState === "playing" ? "animate-pulse" : ""}`}
        >
        ⏱ {seconds}s
        </div>
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
          setStartedAt = {setStartedAt}
          />
        {gameState === "finished" && gameData && gameData.duration && (
          <GameResultCard 
            gameData={gameData} 
            onClose={() => {
              setGameState("idle");
              setTypedText("");
              setGameData({});
              setSeconds(0);
            }}
          />
        )}
      </div>      
    </div>
  );
};

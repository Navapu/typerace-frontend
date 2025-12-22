import { useEffect, useRef } from "react";

export const TypingInput = ({
  textContent,
  typedText,
  setTypedText,
  gameState,
  setGameState,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (gameState !== "finished") {
        inputRef.current?.focus();
    }
  }, [textContent, gameState]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.length > textContent.length) return;

    if (gameState === "idle" && value.length > 0) {
      setGameState("playing");
    }

    setTypedText(value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={typedText}
      onChange={handleChange}
      autoComplete="off"
      spellCheck={false}
      className="absolute opacity-0 pointer-events-none"
    />
  );
};

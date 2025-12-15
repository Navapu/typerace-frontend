import { useEffect, useState } from "react";

const WORDS = [
  "SPEED","TYPING","KEYBOARD","ACCURACY","WPM","FOCUS","PRACTICE","KEYS",
  "RACING","TYPE","FAST","SKILLS","REACTION","TIMING","FLOW","RHYTHM",
  "PERFORMANCE","CHALLENGE","TRAINING","HANDS","FINGERS","INPUT","OUTPUT",
  "SESSION","TEST","IMPROVE","MASTER","GAMING","RACE","MECHANICS",
  "TEXT","LANGUAGE","SPEEDRUN","TRACK","BOOST"
];

const COLORS = [
  "#3B82F6", "#60A5FA", "#A78BFA", "#C084FC",
  "#22D3EE", "#2DD4BF", "#4ADE80"
];

export const FloatingWords = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const spawnWord = () => {
      const word = WORDS[Math.floor(Math.random() * WORDS.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      const newItem = {
        id: crypto.randomUUID(),
        word,
        color,
        left: Math.random() * 90 + 5,
        duration: Math.random() * 10 + 10,
        size: Math.random() * 0.4 + 2,
        delay: Math.random() * 0
      };

      setItems(prev => [...prev, newItem]);

      setTimeout(() => {
        setItems(prev => prev.filter(i => i.id !== newItem.id));
      }, (newItem.duration + 1) * 1000);
    };

    const interval = setInterval(spawnWord, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 floating-mask">
      {items.map(item => (
        <span
          key={item.id}
          className="absolute font-bold animate-float"
          style={{
            left: `${item.left}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            fontSize: `${item.size}rem`,
            color: item.color + "90" // transparencia
          }}
        >
          {item.word}
        </span>
      ))}
    </div>
  );
};

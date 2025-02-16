import React, { useState } from "react";

interface PlayingCardProps {
  name: string;
  value: number | null;
  isAI: boolean;
  color: string;
  onReveal?: () => void;
  isHighlighted?: boolean;
  onAnswer?: () => void;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({
  name,
  value,
  isAI,
  color,
  onReveal,
  isHighlighted,
  onAnswer,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleReveal = () => {
    if (onReveal) {
      setIsFlipped(true);
      onReveal();
      setTimeout(() => {
        setIsFlipped(false); // Flip back after 2 seconds
      }, 2000);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md w-48 h-64 flex flex-col justify-center items-center transition-transform transform ${
        isFlipped ? "rotate-y-180" : ""
      } ${isHighlighted ? "ring-4 ring-yellow-400" : ""}`}
      style={{
        backgroundColor: isAI ? "#E3E4E6" : "#FFF",
        border: `4px solid ${color}`,
        perspective: "1000px", // Add perspective for 3D effect
      }}
      onClick={handleReveal || onAnswer}
    >
      <div
        className={`relative w-full h-full flex flex-col justify-center items-center transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center"
          style={{
            backgroundColor: color,
          }}
        >
          <h3 className="text-lg font-bold text-center text-white">{name}</h3>
          {value !== null && (
            <div className="mt-4 text-2xl font-bold text-white">{value}</div>
          )}
        </div>

        {/* Back of the card */}
        <div
          className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center"
          style={{ backgroundColor: "#000" }}
        >
          <h3 className="text-lg font-bold text-center text-gray-400">Look Away!</h3>
        </div>
      </div>
    </div>
  );
};

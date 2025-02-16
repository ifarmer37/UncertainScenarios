import React, { useState, useEffect } from "react";
import standardTokens from "../data/token";
import aiAgents from "../data/aiAgents";
import { CategorySelector } from "./CategorySelector";
import { useGameSession } from "../hooks/useGameSession";
import type { Player } from "../types";
import PlayingCard from "./PlayingCard";

interface PlayerSetupProps {
  mode: "solo" | "create";
  onPlayersConfirmed: (
    players: Player[],
    codeCracker: Player | null,
    selectedCategory?: string
  ) => void;
  gameId: string | undefined;
}

function PlayerSetup({ mode, onPlayersConfirmed, gameId }: PlayerSetupProps) {
  const { gameSession } = useGameSession(gameId);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [codeCracker, setCodeCracker] = useState<Player | null>(null);

  useEffect(() => {
    if (mode === "solo") {
      const defaultHumanToken = {
        name: "Default Human",
        image: "/tokens/default.png",
        color: "bg-gray-400",
        type: "standard"
      };

      const defaultAIToken = {
        name: "Default AI",
        image: "/tokens/default-ai.png",
        color: "bg-gray-500",
        type: "ai"
      };

      const randomToken = standardTokens[Math.floor(Math.random() * standardTokens.length)] || defaultHumanToken;
      const humanPlayer: Player = {
        id: "human",
        name: "You",
        isAI: false,
        token: {
          name: randomToken?.name || defaultHumanToken.name,
          image: randomToken?.image || defaultHumanToken.image,
          color: randomToken?.color || defaultHumanToken.color,
          type: randomToken?.type || defaultHumanToken.type
        }
      };

      const aiPlayers: Player[] = aiAgents.slice(0, 3).map((agent, index) => ({
        id: `ai_${index + 1}`,
        name: agent.name || `AI Player ${index + 1}`,
        isAI: true,
        token: {
          name: agent.token?.name || defaultAIToken.name,
          image: agent.token?.image || defaultAIToken.image,
          color: agent.token?.color || defaultAIToken.color,
          type: agent.token?.type || defaultAIToken.type,
        },
      }));

      setPlayers([humanPlayer, ...aiPlayers]);
      setCodeCracker(humanPlayer);
    }
  }, [mode]);

  useEffect(() => {
    if (players.length > 0 && codeCracker) {
      onPlayersConfirmed(players, codeCracker, selectedCategory ?? undefined);
    }
  }, [players, codeCracker, selectedCategory, onPlayersConfirmed]);

  const handleCardClick = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (player) {
      setCodeCracker(player);
    }
  };

  return (
    <div className="flex flex-col space-y-8 container mx-auto px-4">
      {/* Category Selection Carousel - Always visible in solo mode */}
      {mode === "solo" && (
        <div className="w-full py-4">
          <CategorySelector onSelectCategory={setSelectedCategory} />
        </div>
      )}

      {/* Game Board with Players */}
      <div className="relative h-[600px] w-full max-w-5xl mx-auto mt-8">
        {/* Transparent Board */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
            border: '2px solid #ccc', // Optional border
          }}
        />

        {/* Players layer */}
        <div className="relative z-10 w-full h-full">
          {/* Code Cracker (You) - Top Right */}
          {players[0] && (
            <div className="absolute top-4 right-4">
              <PlayingCard 
                player={players[0]}
                onSelect={() => handleCardClick(players[0].id)}
              />
            </div>
          )}

          {/* AI Players - Below Board */}
          <div 
            className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex justify-center"
            style={{ gap: '2rem' }}
          >
            {players.slice(1).map((player, index) => (
              <div 
                key={player.id} 
                className="transform"
                style={{ 
                  transform: `translateY(${index * 8}px)`,
                  zIndex: players.length - index 
                }}
              >
                <PlayingCard 
                  player={player}
                  onSelect={() => handleCardClick(player.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerSetup;

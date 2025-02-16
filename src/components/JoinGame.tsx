import React, { useState, useEffect } from "react";
import { categories } from "./data/categories";
import { standardTokens } from "./data/token";
import aiAgents from "./data/aiAgents";
import { PlayerSetup } from "./components/PlayerSetup";
import { GameModeSelector } from "./components/GameModeSelector";
import { GameBoard } from "./components/GameBoard";
import { CategorySelector } from "./components/CategorySelector";
import type { Player } from "./types";
import { useGameSession } from "./hooks/useGameSession";

function JoinGame() {
  const gameId = window.location.pathname.split("/join/")[1];
  const [gameMode, setGameMode] = useState<"solo" | "host" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gamePhase, setGamePhase] = useState<"setup" | "category" | "reveal" | "answer" | "guess">("setup");
  const [isSoloGameInitializing, setIsSoloGameInitializing] = useState(false);

  const { gameSession, addPlayer, refreshPlayers } = useGameSession(gameId);

  // Ensure a valid game session exists
  useEffect(() => {
    if (gameId && !gameSession) {
      console.error("Game session not found. Ensure backend initialization is working.");
      alert("Game session is not ready. Please reload the page.");
    }
  }, [gameId, gameSession]);

  // Set default game mode to "host" if no mode is selected
  useEffect(() => {
    if (gameId && !gameMode) {
      setGameMode("host");
    }
  }, [gameId, gameMode]);

  // Handle game mode selection
  const handleGameModeSelection = async (mode: "solo" | "host") => {
    setGameMode(mode);

    if (!gameSession?.id) {
      console.error("No active game session when selecting game mode.");
      alert("Game session is not ready. Please try again.");
      return;
    }

    if (mode === "solo") {
      await startSoloGame();
    }
  };

  // Start solo game setup
  const startSoloGame = async () => {
    if (!gameSession?.id) {
      console.error("No active game session during solo game setup.");
      alert("Unable to start solo game. Please reload the page and try again.");
      return;
    }

    setIsSoloGameInitializing(true);

    try {
      const humanPlayer = {
        id: `player-${Date.now()}`,
        name: "You",
        token: standardTokens[Math.floor(Math.random() * standardTokens.length)],
        isAI: false,
        isCodeCracker: true,
        cardValue: null,
        game_id: gameSession.id,
      };

      const shuffledAIAgents = aiAgents
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((agent) => ({
          id: `ai-${Date.now()}-${agent.name}`,
          name: agent.name,
          token: agent.token,
          isAI: true,
          isCodeCracker: false,
          cardValue: Math.floor(Math.random() * 10) + 1,
          game_id: gameSession.id,
        }));

      await addPlayer(humanPlayer);
      for (const aiPlayer of shuffledAIAgents) {
        await addPlayer(aiPlayer);
      }

      await refreshPlayers();
      setPlayers(gameSession.players || []);
      setGamePhase("category");
      setGameStarted(true);
    } catch (error) {
      console.error("Error during solo game setup:", error);
      alert("Failed to start solo game. Please try again.");
    } finally {
      setIsSoloGameInitializing(false);
    }
  };

  // Render content based on the current game phase
  const renderGameContent = () => {
    if (!gameMode) {
      return <GameModeSelector isLoading={isSoloGameInitializing} onSelectMode={handleGameModeSelection} />;
    }

    if (gamePhase === "category") {
      return (
        <CategorySelector
          onSelectCategory={(selectedCategory) => {
            console.log("Selected category:", selectedCategory);
            setGamePhase("reveal");
          }}
        />
      );
    }

    if (gameStarted) {
      return <div className="text-center text-white">Game is running...</div>;
    }

    return <div className="text-center text-white">Game setup in progress...</div>;
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/board-background.jpg)' }}>
      <GameBoard gamePhase={gamePhase}>{renderGameContent()}</GameBoard>
    </div>
  );
}

export default JoinGame;

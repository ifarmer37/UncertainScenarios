import React, { useState, useEffect } from "react";
import PlayerSetup from "./components/PlayerSetup";
import { GameModeSelector } from "./components/GameModeSelector";
import PlayingCard from "./components/PlayingCard";
import { Sparkles } from "lucide-react";
import type { Player } from "./types";
import { useGameSession } from "./hooks/useGameSession";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GameConcierge } from "./components/GameConcierge";
import { CategorySelector } from "./components/CategorySelector";

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4 bg-red-100 text-red-800">
          <h2>Something went wrong.</h2>
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const gameId = window.location.pathname.split("/join/")[1];
  const [gameMode, setGameMode] = useState<"create" | "solo" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [codeCracker, setCodeCracker] = useState<Player | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [gamePhase, setGamePhase] = useState("setup");
  const [showIntro, setShowIntro] = useState(true);
  const [showConcierge, setShowConcierge] = useState(true);

  const { gameSession } = useGameSession(gameId);

  useEffect(() => {
    if (gameSession?.id && gameMode) {
      window.history.pushState({}, "", `/join/${gameSession.id}`);
    }
  }, [gameSession?.id, gameMode]);

  const NavigationBar = () => (
    <div className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-800">
            Uncertain Scenarios
          </h1>
        </div>
        <div className="flex gap-4">
          <a
            href="/"
            className="text-purple-600 hover:text-purple-700 font-bold"
          >
            Home
          </a>
          <a
            href="/how-to-play"
            className="text-purple-600 hover:text-purple-700 font-bold"
          >
            How to Play
          </a>
        </div>
      </div>
    </div>
  );

  const handlePlayersConfirmed = (
    confirmedPlayers: Player[],
    selectedCodeCracker: Player | null,
    category?: string
  ) => {
    if (!confirmedPlayers || confirmedPlayers.length === 0) {
      console.error("No players provided");
      return;
    }

    setPlayers(confirmedPlayers);
    setCodeCracker(selectedCodeCracker);
    setSelectedCategory(category);
    setGameStarted(true);
  };

  const handleHelpClick = () => {
    setShowConcierge(true);
  };

  const handleCloseConcierge = () => {
    setShowConcierge(false);
  };

  const renderGameContent = () => {
    if (!gameMode) {
      return <GameModeSelector onSelectMode={setGameMode} />;
    }

    if (!gameStarted) {
      return (
        <ErrorBoundary>
          <PlayerSetup
            mode={gameMode}
            onPlayersConfirmed={handlePlayersConfirmed}
            gameId={gameId}
          />
        </ErrorBoundary>
      );
    }

    return (
      <div className="relative">
        {/* Category Selection Above Board in Solo Play */}
        {gameMode === "solo" && (
          <CategorySelector onSelectCategory={setSelectedCategory} />
        )}

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {players.map((player) => (
            <PlayingCard key={player.id} player={player} onSelect={() => {}} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/board-background.jpg)" }}
    >
      <NavigationBar />
      <div className="container mx-auto px-4 py-16">
        <ErrorBoundary>{renderGameContent()}</ErrorBoundary>
      </div>
      {showConcierge && (
        <GameConcierge
          gamePhase={gamePhase}
          codeCracker={codeCracker}
          onHelpClick={handleHelpClick}
          showIntro={showIntro}
          onClose={handleCloseConcierge}
        />
      )}
    </div>
  );
}

export default App;

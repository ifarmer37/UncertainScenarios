import React from 'react';

interface GameBoardProps {
  gamePhase: string;
  children: React.ReactNode;
}

export function GameBoard({ gamePhase, children }: GameBoardProps) {
  const getBoardClass = () => {
    switch (gamePhase) {
      case 'peak':
        return 'peak-state';
      case 'abyss':
        return 'abyss-state';
      default:
        return '';
    }
  };

  return (
    <div className={`game-board ${getBoardClass()}`}>
      <div className="game-board-content min-h-screen">
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}
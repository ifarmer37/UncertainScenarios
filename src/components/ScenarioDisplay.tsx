import React from 'react';
import type { Player } from '../types';

interface ScenarioDisplayProps {
  category: string;
  players: Player[];
}

const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({ category, players }) => {
  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-800">Scenario: {category}</h2>
      <div className="mt-4">
        {players.map(player => (
          <div key={player.id} className="mb-2 text-gray-700">
            {player.name} ({player.isAI ? 'AI' : 'Human'})
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioDisplay;

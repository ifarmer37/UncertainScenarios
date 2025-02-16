import React from 'react';
import type { Player } from '../types';

interface PlayingCardProps {
  player: Player;
  onSelect: () => void;
}

const PlayingCard: React.FC<PlayingCardProps> = ({ player, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-xl cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2"
      style={{ 
        width: '180px',  // Adjust width if needed
        aspectRatio: '2.5/3.5',  // Standard playing card ratio
      }}
      onClick={onSelect}
    >
      <div className="p-3 flex flex-col h-full">
        {/* Token Image - Takes up top 40% of card */}
        <div className="relative flex-grow mb-2" style={{ height: '40%' }}>
          <img 
            src={player.token.image} 
            alt={player.token.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = '/tokens/default.png'; // Fallback image
            }}
          />
        </div>

        {/* Card Content - Bottom 60% */}
        <div className="flex flex-col justify-end" style={{ height: '60%' }}>
          <h3 className={`text-lg font-bold text-center ${player.token.color}`}>
            {player.name}
          </h3>
          <p className="text-sm text-gray-600 text-center mt-1">
            {player.isAI ? 'AI Player' : 'Human Player'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayingCard;
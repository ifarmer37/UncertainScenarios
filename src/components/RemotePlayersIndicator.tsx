import React from 'react';
import { Users } from 'lucide-react';
import type { Player } from '../types';

interface RemotePlayersIndicatorProps {
  players: Player[];
  currentPlayerId?: string;
}

export function RemotePlayersIndicator({ players, currentPlayerId }: RemotePlayersIndicatorProps) {
  const remotePlayersCount = players.filter(p => p.id !== currentPlayerId).length;

  return (
    <div className="fixed top-24 right-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-purple-600" />
        <div>
          <p className="text-sm font-medium text-gray-800">
            {remotePlayersCount} Remote {remotePlayersCount === 1 ? 'Player' : 'Players'}
          </p>
          <div className="flex -space-x-2 mt-2">
            {players
              .filter(p => p.id !== currentPlayerId)
              .slice(0, 5)
              .map((player, index) => (
                <div
                  key={player.id}
                  className="relative w-8 h-8 rounded-full ring-2 ring-white overflow-hidden"
                  style={{ zIndex: 5 - index }}
                >
                  <img
                    src={player.token.image}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    title={player.name}
                  />
                </div>
              ))}
            {remotePlayersCount > 5 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-white">
                +{remotePlayersCount - 5}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
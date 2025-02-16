import React, { useState } from 'react';
import { standardTokens as tokens } from '../data/token';
import { Token } from '../types';

interface JoinGameFormProps {
  gameId: string;
  onJoin: (name: string, token: Token) => void;
  availableTokens: Token[];
}

export function JoinGameForm({ gameId, onJoin, availableTokens }: JoinGameFormProps) {
  const [playerName, setPlayerName] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName && selectedToken) {
      onJoin(playerName, selectedToken);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Join Game</h2>
        <p className="text-gray-600 text-center mb-6">Game ID: {gameId}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Token
            </label>
            <div className="grid grid-cols-3 gap-4">
              {availableTokens.map((token) => (
                <button
                  key={token.name}
                  type="button"
                  onClick={() => setSelectedToken(token)}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center ${
                    selectedToken === token
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="w-16 h-16 relative overflow-hidden rounded-lg mb-2">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-center">{token.name}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!playerName || !selectedToken}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  );
}
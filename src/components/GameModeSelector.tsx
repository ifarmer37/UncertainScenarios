import React from 'react';
import { Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameModeSelectorProps {
  onSelectMode: (mode: 'solo' | 'create') => void;
  isLoading?: boolean;
}

export function GameModeSelector({ onSelectMode, isLoading = false }: GameModeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {/* Quick Play Solo Button */}
      <motion.button
        whileHover={{
          scale: 1.05,
          y: -8,
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectMode('solo')}
        disabled={isLoading}
        className="w-full bg-gradient-to-br from-amber-500/90 to-amber-600/90 rounded-lg p-8 shadow-xl border-4 border-amber-300 transition"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center">
            <Zap className="w-8 h-8 text-amber-700" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Quick Play Solo</h3>
            <p className="text-amber-100">Jump straight into a game with AI players</p>
          </div>
        </div>
      </motion.button>

      {/* Create Game Button */}
      <motion.button
        whileHover={{
          scale: 1.05,
          y: -8,
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectMode('create')}
        disabled={isLoading}
        className="w-full bg-gradient-to-br from-purple-500/90 to-purple-600/90 rounded-lg p-8 shadow-xl border-4 border-purple-300 transition"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-purple-700" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Create Game</h3>
            <p className="text-purple-100">Start a new game session</p>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

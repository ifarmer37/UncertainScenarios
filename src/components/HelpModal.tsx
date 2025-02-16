import React from 'react';
import { HelpCircle, X, Users, Target, Eye, MessageSquare, FlipHorizontal as DragHorizontal, Sparkles } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartIntro?: () => void;
}

export function HelpModal({ isOpen, onClose, onStartIntro }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold">How to Play Uncertain Scenarios</h2>
        </div>

        <div className="space-y-6">
          <button
            onClick={onStartIntro}
            className="w-full p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Start Genie Introduction
          </button>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Setup Phase</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Add 4-10 players (human and/or AI)</li>
              <li>For human players:
                <ul className="list-circle list-inside ml-4 space-y-1">
                  <li>Enter player name</li>
                  <li>Click an available token to add the player</li>
                </ul>
              </li>
              <li>For AI players:
                <ul className="list-circle list-inside ml-4 space-y-1">
                  <li>Click on an AI agent's token to add them to the game</li>
                  <li>AI players have special character tokens and black borders</li>
                </ul>
              </li>
              <li>Select one human player as the Code Cracker (AI players cannot be Code Crackers)</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Category Selection</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The Code Cracker selects a category for the round</li>
              <li>A scenario question appears about the Code Cracker</li>
              <li>Each player (except Code Cracker) receives a secret number (1-10)</li>
              <li>Numbers represent intensity on a scale from "least" to "most"</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Card Reveal & Scenarios</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Players reveal their numbers one at a time</li>
              <li>When a card is revealed, other players must look away</li>
              <li>After all cards are revealed, players take turns sharing scenarios</li>
              <li>Each player describes a scenario matching their number's intensity</li>
              <li>AI players automatically generate and speak their scenarios</li>
              <li>Scenarios should always be about the Code Cracker</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <DragHorizontal className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Ordering & Winning</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Code Cracker must arrange players from least to most intense</li>
              <li>Drag and drop cards to arrange them in order</li>
              <li>Game ends when either:
                <ul className="list-circle list-inside ml-4 space-y-1">
                  <li>3 successful arrangements are made (Victory!)</li>
                  <li>7 unsuccessful attempts are made (Game Over)</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Layout } from 'lucide-react';

interface CardInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function CardInput({ value, onChange }: CardInputProps) {
  const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Layout className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Your Card</h3>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {cards.map((card) => (
          <button
            key={card}
            onClick={() => onChange(card === 'A' ? 1 : parseInt(card))}
            className={`p-3 rounded-lg border-2 transition-all ${
              (value === 1 && card === 'A') || value === parseInt(card)
                ? 'border-purple-600 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            {card}
          </button>
        ))}
      </div>
    </div>
  );
}
import React from 'react';

interface QuestionDisplayProps {
  question: string;
  category: string;
  arrangerName?: string;
}

export default function QuestionDisplay({ question = "No question available", category = "default", arrangerName }: QuestionDisplayProps) {
  const categoryColors: Record<string, string> = {
    wild: 'border-red-500',
    adventures: 'border-green-500',
    relationships: 'border-pink-500',
    memories: 'border-teal-500',
    popculture: 'border-orange-500',
    future: 'border-blue-500',
    preferences: 'border-red-500',
    skills: 'border-yellow-500',
    whatif: 'border-purple-500',
  };

  const borderColor = categoryColors[category] || 'border-gray-500';

  return (
    <div
      className={`relative flex items-center justify-center w-11/12 max-w-sm mx-auto h-36 bg-white rounded-lg shadow-lg border-4 ${borderColor}`}
    >
      <div className="text-center">
        <p className="text-lg font-bold">{question}</p>
        {arrangerName && <p className="text-sm text-gray-500 mt-2">Arranger: {arrangerName}</p>}
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

interface QuestionDisplayProps {
  question: string;
  category: string;
  codeCrackerName?: string;
}

export default function QuestionDisplay({ question, category, codeCrackerName }: QuestionDisplayProps) {
  const categoryColors: Record<string, string> = {
    health: 'border-emerald-500',
    travel: 'border-blue-500',
    childhood: 'border-yellow-500',
    relationships: 'border-pink-500',
    work: 'border-purple-500'
  };

  const borderColor = categoryColors[category] || 'border-purple-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white/95 backdrop-blur-sm rounded-xl shadow-xl ${borderColor} border-4`}
    >
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">
            {question.replace('Code Cracker', codeCrackerName || 'Code Cracker')}
          </h2>
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-600">Least</span>
              <span className="text-xs text-gray-500">Intensity</span>
            </div>
            <div className="h-2 flex-1 mx-4 bg-gradient-to-r from-blue-200 via-purple-300 to-red-300 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-600">Most</span>
              <span className="text-xs text-gray-500">Intensity</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
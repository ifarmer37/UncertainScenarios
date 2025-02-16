import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Question } from '../types';

interface CustomQuestionFormProps {
  onSubmit: (question: Omit<Question, 'id'>) => void;
}

export function CustomQuestionForm({ onSubmit }: CustomQuestionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [leastDescription, setLeastDescription] = useState('');
  const [mostDescription, setMostDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !leastDescription.trim() || !mostDescription.trim()) {
      alert("All fields are required.");
      return;
    }
    onSubmit({
      text: question.trim(),
      category: 'custom',
      leastDescription: leastDescription.trim(),
      mostDescription: mostDescription.trim(),
    });
    setQuestion('');
    setLeastDescription('');
    setMostDescription('');
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add Custom Question</span>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              aria-label="Enter your custom question"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              "1" Description (Least)
            </label>
            <input
              type="text"
              value={leastDescription}
              onChange={(e) => setLeastDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              "10" Description (Most)
            </label>
            <input
              type="text"
              value={mostDescription}
              onChange={(e) => setMostDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Question
          </button>
        </form>
      )}
    </div>
  );
}

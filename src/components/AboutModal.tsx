import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">About Uncertain Scenarios</h2>
          <p className="text-gray-700 leading-relaxed">
            Uncertain Scenarios has been developed by Frontiering largely using{' '}
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              bolt.new
            </a>
            {' '}to do most of the coding and deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
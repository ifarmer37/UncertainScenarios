import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceControlProps {
  onCommand: (command: string) => void;
}

export function VoiceControl({ onCommand }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);

  const toggleVoice = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        onCommand(command);
      };

      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <button
      onClick={toggleVoice}
      className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg
        ${isListening ? 'bg-red-500' : 'bg-purple-600'} 
        text-white hover:opacity-90 transition-opacity`}
      title={isListening ? 'Stop voice control' : 'Start voice control'}
    >
      {isListening ? (
        <MicOff className="w-6 h-6" />
      ) : (
        <Mic className="w-6 h-6" />
      )}
    </button>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, SkipForward, Repeat, X } from 'lucide-react';
import { speakTextElevenLabs } from '../utils/tts'; // Importing the new TTS function

interface GameConciergeProps {
  gamePhase: string;
  codeCracker: any;
  onHelpClick: () => void;
  showIntro?: boolean;
  onClose: () => void;
}

export const GameConcierge: React.FC<GameConciergeProps> = ({
  gamePhase,
  codeCracker,
  onHelpClick,
  showIntro = false,
  onClose,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenieClicked, setIsGenieClicked] = useState(false);

  const getPhaseScript = () => {
    switch (gamePhase) {
      case 'setup':
        return [
          "Welcome to Uncertain Scenarios! I'm your Game Concierge, and I'll guide you through this journey.",
          "First, let's add some players. You'll need between 4 and 10 players.",
          "Enter a name and choose a token for each player. You can also add AI players!",
          "One player will be our Code Cracker - they'll try to arrange the other players' scenarios in order.",
          "Click the Help button anytime if you need more guidance!"
        ];
      case 'category':
        return [
          `${codeCracker?.name} is our Code Cracker! Now let's choose a category.",
          "Each category offers different types of scenarios to explore.",
          "Choose wisely - this will shape the stories we'll create!"
        ];
      case 'reveal':
        return [
          "Time to reveal your cards! Each player has a number from 1-10.",
          "When it's your turn, click your card to reveal your number.",
          "Remember your number - you'll create a scenario based on its intensity!"
        ];
      case 'answer':
        return [
          "Now share your scenarios! The higher your number, the more intense your story should be.",
          "Make your scenario about the Code Cracker, but don't give away your number!",
          `${codeCracker?.name} will try to arrange everyone in order from least to most intense.`
        ];
      default:
        return ["Need any help? Just click the Help button and I'll explain everything!"];
    }
  };

  useEffect(() => {
    if (isGenieClicked && !isPlaying) {
      setCurrentLine(0);
      setIsPlaying(true);
    }
  }, [isGenieClicked, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const script = getPhaseScript();
    if (currentLine >= script.length) {
      setHasPlayedIntro(true);
      setIsPlaying(false);
      return;
    }

    speakTextElevenLabs(script[currentLine]).then(() => {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 1000);
    });

  }, [currentLine, isPlaying]);

  const handleGenieClick = () => {
    setIsGenieClicked(true);
    onHelpClick();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0], rotate: [0, 3, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="fixed top-24 right-8 z-50 cursor-pointer"
        onClick={handleGenieClick}
      >
        <img src="/tokens/genie.png" alt="Game Genie" className="w-32 h-32 object-contain" />
      </motion.div>
    </AnimatePresence>
  );
};


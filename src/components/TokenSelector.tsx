import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, ChevronLeft, ChevronRight } from "lucide-react";

interface TokenSelectorProps {
  onTokenSelect: (token: Token) => void;
  selectedTokenType: "standard" | "fantasy";
  onTokenTypeChange: (type: "standard" | "fantasy") => void;
  availableTokens: Token[];
  disabled?: boolean;
}

export function TokenSelector({
  onTokenSelect,
  selectedTokenType,
  onTokenTypeChange,
  availableTokens,
  disabled = false
}: TokenSelectorProps) {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  const handlePrevToken = () => {
    setSelectedTokenIndex((prev) => 
      prev === 0 ? availableTokens.length - 1 : prev - 1
    );
  };

  const handleNextToken = () => {
    setSelectedTokenIndex((prev) => 
      prev === availableTokens.length - 1 ? 0 : prev + 1
    );
  };

  const renderTokenCarousel = () => {
    if (!availableTokens.length) {
      return <p className="text-center text-gray-600">No tokens available.</p>;
    }

    const visibleTokens = availableTokens.slice(selectedTokenIndex, selectedTokenIndex + 5);
    const needsMore = visibleTokens.length < 5;
    if (needsMore) {
      visibleTokens.push(...availableTokens.slice(0, 5 - visibleTokens.length));
    }

    return (
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevToken}
          disabled={disabled || availableTokens.length <= 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-4 overflow-hidden">
          {visibleTokens.map((token, index) => (
            <motion.div
              key={`${token.name}-${index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-48"
            >
              <button
                onClick={() => onTokenSelect(token)}
                disabled={disabled}
                className={`w-full bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center border-2 
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-opacity-100 transition-all duration-300'}
                  ${selectedTokenType === 'fantasy' ? "border-indigo-200" : "border-purple-200"}`}
              >
                <div className="w-32 h-32 rounded-lg overflow-hidden mb-4 bg-gray-50">
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-lg font-medium text-gray-800">{token.name}</p>
              </button>
            </motion.div>
          ))}
        </div>

        <button
          onClick={handleNextToken}
          disabled={disabled || availableTokens.length <= 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  const renderTokenGrid = () => {
    if (!availableTokens.length) {
      return <p className="text-center text-gray-600">No tokens available.</p>;
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {availableTokens.map((token) => (
          <motion.div
            key={token.name}
            whileHover={!disabled ? { scale: 1.05 } : {}}
          >
            <button
              onClick={() => onTokenSelect(token)}
              disabled={disabled}
              className={`w-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center border-2 
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-opacity-100 transition-all duration-300'}
                ${selectedTokenType === 'fantasy' ? "border-indigo-200" : "border-purple-200"}`}
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden mb-2 bg-gray-50">
                <img
                  src={token.image}
                  alt={token.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 text-center">{token.name}</p>
            </button>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => onTokenTypeChange("standard")}
            disabled={disabled}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              selectedTokenType === "standard"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-purple-100"
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Sparkles className="w-5 h-5" />
            Standard Tokens
          </button>
          <button
            onClick={() => onTokenTypeChange("fantasy")}
            disabled={disabled}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              selectedTokenType === "fantasy"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Wand2 className="w-5 h-5" />
            Fantasy Tokens
          </button>
        </div>
        
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Switch to {isGridView ? 'Carousel' : 'Grid'} View
        </button>
      </div>

      <div className="mt-8">
        {isGridView ? renderTokenGrid() : renderTokenCarousel()}
      </div>
    </div>
  );
}
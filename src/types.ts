export interface Player {
  id: string;
  name: string;
  isAI: boolean;
  token: {
    name: string;
    image: string;
    color: string;
    type: string;
  };
} 

.game-board::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.game-board-content {
  position: relative;
  z-index: 2;
}

/* Text Shadow for better readability on background */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-lg {
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
}

/* Game States */
.peak-state {
  background: linear-gradient(to bottom right, #4ade80, #22c55e);
}

.abyss-state {
  background: linear-gradient(to bottom right, #ef4444, #dc2626);
}

/* Card Animations */
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

.animate-wiggle {
  animation: wiggle 0.3s ease-in-out;
}

/* 3D Card Transformations */
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Medieval Font */
@font-face {
  font-family: 'MedievalSharp';
  src: url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
}

.font-medieval {
  font-family: 'MedievalSharp', cursive;
}

/* Category Card Styles */
.category-card {
  transition: transform 0.3s ease-in-out;
}

.category-card:hover {
  transform: translateY(-5px);
}

/* Question Card Styling */
.question-card {
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.25rem;
  padding: 1rem;
  background-color: white;
}
/* Token image styling */
.token-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure the entire image fits within its container */
  border-radius: 0.25rem; /* Optional: Slight rounding for aesthetics */
  display: block;
}

/* Adjust the container for tokens if necessary */
.token-container {
  width: 80px; /* Adjust based on design */
  height: 80px;
  position: relative;
  overflow: hidden; /* Prevent overflow */
  background-color: rgba(255, 255, 255, 0.1); /* Subtle background */
}
.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}


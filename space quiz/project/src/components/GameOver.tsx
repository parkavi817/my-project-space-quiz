import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="card-backdrop p-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
      <p className="text-lg text-slate-300 mb-6">Final Score: {score}</p>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}
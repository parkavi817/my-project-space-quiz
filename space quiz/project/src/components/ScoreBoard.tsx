import React from 'react';
import { Rocket } from 'lucide-react';

interface ScoreBoardProps {
  currentScore: number;
  highScore: number;
  wrongAnswers: number;
  boosters: number;
  onUseBooster: () => void;
}

export function ScoreBoard({ currentScore, highScore, wrongAnswers, boosters, onUseBooster }: ScoreBoardProps) {
  return (
    <div className="card-backdrop p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-slate-400">Current Score</p>
          <p className="text-2xl font-bold text-white">{currentScore}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400">High Score</p>
          <p className="text-2xl font-bold text-white">{highScore}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400">Wrong Answers</p>
          <p className="text-2xl font-bold text-red-400">{wrongAnswers}/3</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400">Boosters</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-2xl font-bold text-blue-400">{boosters}</p>
            {boosters > 0 && (
              <button
                onClick={onUseBooster}
                className="booster-button"
                title="Use Booster"
              >
                <Rocket className="w-5 h-5 text-blue-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
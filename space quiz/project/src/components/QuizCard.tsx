import React from 'react';
import type { Question } from '../types';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isDisabled: boolean;
}

export function QuizCard({ question, onAnswer, isDisabled }: QuizCardProps) {
  return (
    <div className="card-backdrop p-6 max-w-2xl w-full">
      <div className="mb-6">
        <span className={`difficulty-badge difficulty-badge-${question.difficulty}`}>
          {question.difficulty.toUpperCase()}
        </span>
      </div>
      <h2 className="text-xl font-bold text-white mb-6">{question.question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={isDisabled}
            className="answer-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
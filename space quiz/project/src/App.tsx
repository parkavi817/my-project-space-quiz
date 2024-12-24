import React from 'react';
import { questions } from './data/questions';
import { QuizCard } from './components/QuizCard';
import { ScoreBoard } from './components/ScoreBoard';
import { GameOver } from './components/GameOver';
import { useQuizGame } from './hooks/useQuizGame';
import './styles/index.css';

function App() {
  const {
    currentQuestionIndex,
    score,
    highScore,
    wrongAnswers,
    boosters,
    gameOver,
    handleAnswer,
    handleUseBooster,
    handleRestart
  } = useQuizGame(questions);

  return (
    <div className="quiz-container">
      <div className="max-w-4xl mx-auto space-y-6">
        <ScoreBoard
          currentScore={score}
          highScore={highScore}
          wrongAnswers={wrongAnswers}
          boosters={boosters}
          onUseBooster={handleUseBooster}
        />
        
        {gameOver ? (
          <GameOver score={score} onRestart={handleRestart} />
        ) : (
          <QuizCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            isDisabled={gameOver}
          />
        )}
      </div>
    </div>
  );
}

export default App;
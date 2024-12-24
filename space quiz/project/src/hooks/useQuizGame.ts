import { useState, useEffect } from 'react';
import { Question } from '../types';
import { calculatePoints, shouldAwardBooster } from '../utils/scoring';
import { getStoredHighScore, saveHighScore } from '../utils/storage';

export function useQuizGame(questions: Question[]) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getStoredHighScore);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [boosters, setBoosters] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      saveHighScore(score);
    }
  }, [score, highScore]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answer === currentQuestion.correctAnswer) {
      const points = calculatePoints(currentQuestion.difficulty);
      const newScore = score + points;
      setScore(newScore);
      
      if (shouldAwardBooster(score, newScore)) {
        setBoosters(prev => prev + 1);
      }
    } else {
      setScore(prev => Math.max(0, prev - 1));
      setWrongAnswers(prev => prev + 1);
      if (wrongAnswers + 1 >= 3) {
        setGameOver(true);
        return;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleUseBooster = () => {
    if (boosters > 0) {
      setBoosters(prev => prev - 1);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setWrongAnswers(0);
    setBoosters(0);
    setGameOver(false);
  };

  return {
    currentQuestionIndex,
    score,
    highScore,
    wrongAnswers,
    boosters,
    gameOver,
    handleAnswer,
    handleUseBooster,
    handleRestart
  };
}
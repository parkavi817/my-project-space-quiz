import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Rocket } from 'lucide-react';
import './styles.css';

// Types
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Questions data
const questions: Question[] = [
  {
    id: 1,
    question: "What is the closest planet to the Sun?",
    options: ["Venus", "Mercury", "Mars", "Earth"],
    correctAnswer: "Mercury",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "How many moons does Mars have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is the largest moon in our solar system?",
    options: ["Titan", "Europa", "Ganymede", "Io"],
    correctAnswer: "Ganymede",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "What is the name of the galaxy that contains our solar system?",
    options: ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"],
    correctAnswer: "Milky Way",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "What phenomenon is responsible for the Earth's seasons?",
    options: ["Earth's rotation", "Earth's axial tilt", "Distance from the Sun", "Solar winds"],
    correctAnswer: "Earth's axial tilt",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "What is the name of the boundary where the Sun's influence ends?",
    options: ["Heliopause", "Magnetosphere", "Thermosphere", "Exosphere"],
    correctAnswer: "Heliopause",
    difficulty: "hard"
  },
  {
    id: 7,
    question: "What is the process by which stars generate energy?",
    options: ["Nuclear fission", "Nuclear fusion", "Chemical reaction", "Thermal radiation"],
    correctAnswer: "Nuclear fusion",
    difficulty: "medium"
  },
  {
    id: 8,
    question: "What is the approximate age of the universe in billions of years?",
    options: ["9.8", "13.8", "15.8", "18.8"],
    correctAnswer: "13.8",
    difficulty: "hard"
  }
];

// Utility functions
const calculatePoints = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy': return 1;
    case 'medium': return 2;
    case 'hard': return 3;
    default: return 0;
  }
};

// Components
function ScoreBoard({ currentScore, highScore, wrongAnswers, boosters, onUseBooster }) {
  return (
    <div className="card p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="score-text">Current Score</p>
          <p className="score-value">{currentScore}</p>
        </div>
        <div className="text-center">
          <p className="score-text">High Score</p>
          <p className="score-value">{highScore}</p>
        </div>
        <div className="text-center">
          <p className="score-text">Wrong Answers</p>
          <p className="score-value text-red-400">{wrongAnswers}/3</p>
        </div>
        <div className="text-center">
          <p className="score-text">Boosters</p>
          <div className="flex items-center justify-center gap-2">
            <p className="score-value text-blue-400">{boosters}</p>
            {boosters > 0 && (
              <button onClick={onUseBooster} className="p-1 hover:bg-slate-700/50 rounded-full transition-colors">
                <Rocket className="w-5 h-5 text-blue-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizCard({ question, onAnswer, isDisabled }) {
  return (
    <div className="card p-6">
      <div className="mb-6">
        <span className={`difficulty-badge difficulty-badge-${question.difficulty}`}>
          {question.difficulty.toUpperCase()}
        </span>
      </div>
      <h2 className="title">{question.question}</h2>
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

function GameOver({ score, onRestart }) {
  return (
    <div className="card p-6 text-center">
      <h2 className="title">Game Over!</h2>
      <p className="text-lg text-slate-300 mb-6">Final Score: {score}</p>
      <button onClick={onRestart} className="button button-primary">
        Play Again
      </button>
    </div>
  );
}

// Main App
function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [boosters, setBoosters] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answer === currentQuestion.correctAnswer) {
      const points = calculatePoints(currentQuestion.difficulty);
      const newScore = score + points;
      setScore(newScore);
      
      if (Math.floor(newScore / 10) > Math.floor(score / 10)) {
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

// Initialize the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
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

export type { Question };
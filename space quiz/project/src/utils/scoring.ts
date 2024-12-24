export const calculatePoints = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    default:
      return 0;
  }
};

export const shouldAwardBooster = (currentScore: number, newScore: number): boolean => {
  return Math.floor(newScore / 10) > Math.floor(currentScore / 10);
};
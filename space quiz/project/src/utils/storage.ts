const STORAGE_KEYS = {
  HIGH_SCORE: 'highScore'
} as const;

export const getStoredHighScore = (): number => {
  const saved = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
  return saved ? parseInt(saved, 10) : 0;
};

export const saveHighScore = (score: number): void => {
  localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
};
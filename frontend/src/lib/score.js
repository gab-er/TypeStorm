const ERROR_PENALTY_CONSTANT = 40;
const ERROR_PENALTY_MODIFIER = 1.2;
const PERFECT_ACCURACY_MODIFIER = 1.3;

const calculateScore = (wpm, accuracy, errors, numWords) => {
  // Formula: Score = (((wpm * accuracy * numWords)) - (errors^1.2 * PENALTY))
  // Use Math.max(score, 0) to prevent score from becoming negative
  // Perfect Accuracy Modifier: 1.3x

  const base = wpm * accuracy * numWords;
  const errorPenalty =
    Math.pow(errors, ERROR_PENALTY_MODIFIER) * ERROR_PENALTY_CONSTANT;

  let score = Math.max(base - errorPenalty, 0);

  // Perfect accuracy
  if (accuracy === 1) {
    score *= PERFECT_ACCURACY_MODIFIER;
  }

  return Math.floor(score); // Remove decimal places
};

export default calculateScore;

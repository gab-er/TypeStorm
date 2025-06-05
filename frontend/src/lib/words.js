import { words } from "popular-english-words";
import Letter from "@/app/components/Letter";
import Word from "@/app/components/Word";

// Returns an array of words
const mostCommonWords = words.getMostPopularLength(35, 5);

const wordsData = mostCommonWords;

// Obtaining an array of all letters
const lettersData = mostCommonWords.join(" ").split("").flat();

export { wordsData, lettersData };
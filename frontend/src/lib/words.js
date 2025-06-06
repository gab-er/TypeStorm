import { words } from "popular-english-words";
import Letter from "@/app/components/TypeBox/Letter";
import Word from "@/app/components/TypeBox/Word";

// Returns an array of words
const mostCommonWords = words.getMostPopularLength(33, 5);

// Adding a space to the end of every word 
const wordsData = mostCommonWords.map(word => word + " ");
console.log(wordsData);

// Obtaining an array of all letters
const lettersData = mostCommonWords.join(" ").split("").flat();

export { wordsData };

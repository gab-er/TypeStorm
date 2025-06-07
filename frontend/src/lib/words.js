import { words } from "popular-english-words";
import Letter from "@/app/components/TypeBox/Letter";
import Word from "@/app/components/TypeBox/Word";

// Returns an array of words (note this is predetermined)
const mostCommonWords = words.getMostPopularFilter(1000, (word) => {
  return word.length > 2 && word.length < 10;
});

// Adding a space to the end of every word
const wordsData = mostCommonWords.map((word) => word + " ");

// Obtaining an array of all letters
const lettersData = mostCommonWords.join(" ").split("").flat();

// Function to split an array of words into arrays of arrays of word (for wordlines)
const splitWords = (wordsData, wordsPerLine) => {
  const lines = [];
  const length = wordsData.length;
  for (let i = 0; i < length; i += wordsPerLine) {
    const line = wordsData.slice(i, i + wordsPerLine);
    lines.push(line);
  }
  return lines;
};

// Function to count the number of letters in a line of words
const countLetters = (line) => {
  let count = 0;
  line.map((word) => {
    count += word.length;
  });

  return count;
};

// Function to randomly shuffle a given array of words
const shuffleWords = (arr) => {
  // Yates-Fisher algorithm to shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export { wordsData, splitWords, countLetters, shuffleWords };

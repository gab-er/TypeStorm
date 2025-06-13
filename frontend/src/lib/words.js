import { words } from "popular-english-words";
// import wordListRaw from './google-10000-english-no-swears.txt?raw'; // via file loader or fetch

// async function fetchTextFile() {
//   const response = await fetch("google-10000-english-no-swears.txt");
//   const text = await response.text();
//   // console.log(text);
//   return text.trim().split("\n");
// }
// const top10000EnglishWords = fetchTextFile()
// const mostCommonWords = top10000EnglishWords;

// Words that should be excluded 
const excludedWords = ["nbsp", "www", "bgcolor", "html", "etc", "mdash", "afded", "didn", "php", "rowspan"]

// Returns an array of words (note this is predetermined)
const mostCommonWords = words.getMostPopularFilter(1000, (word) => {
  return word.length > 2 && word.length < 9 && !excludedWords.includes(word);
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

// Function to split a typed text into words, including spaces (eg. ["door ", "pig "])
// O(n) time complexity with an array
const splitWordsWithSpaces = (typedText) => {
  if (typedText === "") {
    return [""];
  }

  const res = [];
  let word = [];
  let i = 0;
  while (i < typedText.length) {
    if (typedText[i] === " ") {
      word.push(typedText[i]);
      res.push(word.join(""));
      word = [];
    } else {
      word.push(typedText[i]);
    }

    // word is unfinished, and if the last char is a space, dont add it (to prevent appending an empty string)
    if (i === typedText.length - 1 && typedText[i] !== " ") {
      res.push(word.join(""));
    }
    i++;
  }
  return res;
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
  // Yates-Fisher algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

// Function to randomly select N words from the words array
const generateRandomWords = (wordsData, num) => {
  if (num > wordsData.length) {
    throw new Error("length exceeded");
  }

  // Create a set of random indexes (so they are all unique)
  const randomIndexes = new Set();
  while (randomIndexes.size < num) {
    const index = Math.floor(Math.random() * wordsData.length);
    randomIndexes.add(index);
  }

  // Convert the set into an array
  const randomIndexesArray = Array.from(randomIndexes);

  // Map each index to a random word in the wordsData
  const randomWords = randomIndexesArray.map((index) => wordsData[index]);
  return randomWords;
};

export {
  wordsData,
  splitWords,
  countLetters,
  splitWordsWithSpaces,
  generateRandomWords,
};

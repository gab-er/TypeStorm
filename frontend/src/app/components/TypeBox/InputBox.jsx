"use client";
import { useState, useRef } from "react";
import DisplayBox from "./DisplayBox";
import { splitWords, countLetters } from "@/lib/words";
import BlurBox from "./BlurBox";

const WORDS_PER_LINE = 9;
const LINES_ON_SCREEN = 3;

// This offset is to keep track of the correct word position after the lines update

const InputBox = ({
  wordsData,
  wordsTypedOffset,
  setWordsTypedOffset,
  lettersCorrectlyTyped,
  setLettersCorrectlyTyped,
  incrementLettersCorrectlyTyped,
}) => {
  // State to keep track of what is being typed in the input box
  const [typedText, setTypedText] = useState("");

  // State to keep track of whether the input box is clicked on or not
  const [focus, setFocus] = useState(true);

  // State to keep track of what is the current line
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Reference for what key was just pressed
  const currentKeyRef = useRef(null);

  // Reference for the input box for focusing and blurring
  const inputRef = useRef(null);

  // Current letter for caret to display on
  const currentLetter = typedText.length;

  // Split the word data into lines
  const lines = splitWords(wordsData, WORDS_PER_LINE);

  // Which lines are currently visible on screen
  const visibleLines = lines.slice(
    currentLineIndex,
    currentLineIndex + LINES_ON_SCREEN
  );

  // Obtain all typed words
  let typedWords = typedText.split(" ");

  // Keep track of what word is currently being typed
  let currentWordIndex = typedWords.length - 1;
  const currentTypedWord = typedWords[currentWordIndex];
  const correctWord = wordsData[currentWordIndex + wordsTypedOffset];

  // Function to handle input box text changes
  const handleTextChange = (e) => {
    const newText = e.target.value;
    const keyPressed = currentKeyRef.current; // Current key being pressed

    // Allow backspace to delete letters
    if (keyPressed == "Backspace") {
      setTypedText(newText);
      return;
    }

    const addedChar = newText.slice(-1); // Char that was just added
    const lastChar = typedText.slice(-1); // Previous char in the input box

    // Cases where input is not allowed
    if (
      (addedChar === " " && lastChar === " ") || // Do not allow consecutive spaces
      (addedChar === " " && !lastChar) || // First character typed should not be a space
      (currentTypedWord.length + 2 > correctWord.length && addedChar != " ") || // Prevents the caret from going beyond the current word length
      (addedChar == " " && currentTypedWord.length + 1 != correctWord.length) // Prevents pressing space in the middle of a word
    ) {
      return;
    }

    setTypedText(newText);

    // Obtain all typed words
    typedWords = typedText.split(" ").filter((word) => {
      return word != "";
    });

    // Shifting the display when the middle line has been fully typed
    const wordsTyped = typedWords.length;
    // 2 lines have been typed and space is pressed
    if (wordsTyped === 2 * WORDS_PER_LINE && addedChar === " ") {
      // Obtain the length of the first visible line
      const firstLineLength = countLetters(visibleLines[0]);

      // Remove the first line from the typed text
      setTypedText(newText.slice(firstLineLength)); // Must use newText since typeText is not fully updated
      setCurrentLineIndex((prev) => prev + 1);
      setWordsTypedOffset(wordsTypedOffset + WORDS_PER_LINE);
    }
  };

  // Function to handle key presses that do not change the input text
  const handleOtherChanges = (e) => {
    currentKeyRef.current = e.key;
    // Escape - reset the typed text
    if (e.key === "Escape") {
      setTypedText("");
      console.log("reset");
    }
  };

  // Function to handle focus of the input box
  const handleFocus = () => {
    setFocus(true);
  };

  // Function to handle blur of the input box
  const handleBlur = () => {
    setFocus(false);

    // Unfocus the input box so you cannot type in it after clicking out
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center relative">
        {!focus && (
          <div className="absolute mt-30">
            <BlurBox />
          </div>
        )}
        <div className="absolute mt-30">
          <DisplayBox
            currentLetter={currentLetter}
            typedWords={typedWords}
            wordsData={wordsData}
            focus={focus}
            currentLineIndex={currentLineIndex}
            WORDS_PER_LINE={WORDS_PER_LINE}
            LINES_ON_SCREEN={LINES_ON_SCREEN}
            visibleLines={visibleLines}
            lettersCorrectlyTyped={lettersCorrectlyTyped}
            setLettersCorrectlyTyped={setLettersCorrectlyTyped}
            incrementLettersCorrectlyTyped={incrementLettersCorrectlyTyped}
          />
        </div>
        <input
          type="text"
          value={typedText}
          onChange={handleTextChange}
          onKeyDown={handleOtherChanges}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          className="text-start opacity-0 cursor-default w-[1000px] h-[200px] absolute bg-white text-black pb-40 pl-2.5 text-3xl mt-30 border"
        />
      </div>
    </>
  );
};

export default InputBox;

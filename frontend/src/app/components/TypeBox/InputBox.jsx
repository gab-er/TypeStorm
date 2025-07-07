"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import DisplayBox from "./DisplayBox";
import {
  splitWords,
  countLetters,
  splitWordsWithSpaces,
} from "../../../lib/words";
import BlurBox from "./BlurBox";
import useWordsStore from "../../stores/useWordsStore";
import useTimedStore from "@/app/stores/useTimedStore";
import gameModes from "@/lib/gamemodes";

const WORDS_PER_LINE = 10;
const LINES_ON_SCREEN = 3;
const DEFAULT_CARET_POSITION = { x: 9, y: 20 };

// The InputBox contains two things: An invisible input box and a box to display the given words
const InputBox = ({
  wordsData,
  wordsTypedOffset,
  setWordsTypedOffset,
  numWords,
  gameCompleted,
  setGameCompleted,
  currentLineIndex,
  setCurrentLineIndex,
  numWordsTyped,
  setNumWordsTyped,
  typedText,
  setTypedText,
  setStartedTyping,
  startedTyping,
  setAllTypedWords,
  focus,
  setFocus,
  inputRef,
}) => {
  // State to keep track of caret position
  const [caretPos, setCaretPos] = useState(DEFAULT_CARET_POSITION);

  // Function to update the caret position based on the ref
  const updateCaretRef = (letterRef, displayBoxRef) => {
    const letterRect = letterRef.current.getBoundingClientRect();
    const displayBoxRect = displayBoxRef.current.getBoundingClientRect();

    setCaretPos({
      x: letterRect.left - displayBoxRect.left,
      y: letterRect.top - displayBoxRect.top,
    });
  };

  // Functions to increase/decrease/reset letters (correctly) typed
  const increaseLettersCorrectlyTyped = useWordsStore(
    (state) => state.increaseLettersCorrectlyTyped
  );
  const increaseLettersTyped = useWordsStore(
    (state) => state.increaseLettersTyped
  );
  const decreaseLettersCorrectlyTyped = useWordsStore(
    (state) => state.decreaseLettersCorrectlyTyped
  );
  const decreaseLettersTyped = useWordsStore(
    (state) => state.decreaseLettersTyped
  );
  const resetLettersCorrectlyTyped = useWordsStore(
    (state) => state.resetLettersCorrectlyTyped
  );
  const resetLettersTyped = useWordsStore((state) => state.resetLettersTyped);
  const increaseErrors = useWordsStore((state) => state.increaseErrors);
  const resetErrors = useWordsStore((state) => state.resetErrors);
  const resetTimers = useWordsStore((state) => state.resetTimers);

  // useWordsStore states
  const mode = useWordsStore((state) => state.mode);

  // useTimedStore states and functions
  const resetTimer = useTimedStore((state) => state.resetTimer);
  const timeLeft = useTimedStore((state) => state.timeLeft);

  // Reference for what key was just pressed
  const currentKeyRef = useRef(null);

  // Current letter for caret to display on
  const currentLetter = typedText.length;

  // Split the word data into lines
  const lines = splitWords(wordsData, WORDS_PER_LINE);

  // Which lines are currently visible on screen
  // Memoized so that it only recalculates when lines or currentLineIndex changes, not when the component re-renders
  const visibleLines = useMemo(() => {
    return lines.slice(currentLineIndex, currentLineIndex + LINES_ON_SCREEN);
  }, [lines, currentLineIndex]);

  // Obtain old typed words (prior to changing on new input)
  let typedWords = splitWordsWithSpaces(typedText);

  // Determine if game should end in Timed mode
  useEffect(() => {
    if (mode === "timed" && timeLeft === 0) {
      setGameCompleted(true);
    }
  }, [timeLeft]);

  // Function to handle input box text changes
  const handleTextChange = (e) => {
    // Do not allow changes once the game has completed
    if (gameCompleted) {
      return;
    }

    // Set start typing to true to start the timer
    if (!startedTyping) {
      setStartedTyping(true);
    }

    const newText = e.target.value;
    const newTypedWords = splitWordsWithSpaces(newText);

    // Keep track of what word is currently being typed
    const currentWordIndex = newTypedWords.length - 1;
    const currentTypedWord = newTypedWords[currentWordIndex];

    // Keep track of the correct word to type
    const correctWord = wordsData[currentWordIndex + wordsTypedOffset];

    const keyPressed = currentKeyRef.current; // Current key being pressed (checks for backspace etc.)
    const correctKeyToPress = correctWord[currentTypedWord.length - 1];
    const addedChar = newText.slice(-1); // Char that was just added
    const lastChar = typedText.slice(-1); // Previous char in the input box

    // Allow backspace to delete letters
    if (keyPressed == "Backspace") {
      // Decrease overall letters typed by one
      decreaseLettersTyped();

      // Keep track of what word is currently being typed
      let oldWordIndex = typedWords.length - 1;
      const oldTypedWord = typedWords[oldWordIndex];

      // Keep track of the previous correct word (prior to backspacing)
      const oldCorrectWord = wordsData[oldWordIndex + wordsTypedOffset];

      // Char that was just deleted
      const charDeleted = typedText.slice(-1);

      // What was the correct character in the position that was just deleted
      const correctCharDeleted = oldCorrectWord[oldTypedWord.length - 1];

      // Decrease letters correctly typed ONLY if the previously typed letter was correct
      // Do not decrease errors since it should be penalized
      if (correctCharDeleted === charDeleted) {
        decreaseLettersCorrectlyTyped();
      }

      if (charDeleted === " ") {
        setNumWordsTyped((prev) => prev - 1);
        setAllTypedWords((prev) => prev.slice(0, -1)); // remove the previously typed word
      }

      setTypedText(newText);
      return;
    }

    // Cases where input is not allowed
    if (
      (addedChar === " " && lastChar === " ") || // Do not allow consecutive spaces
      (addedChar === " " && !lastChar) || // First character typed should not be a space
      (currentTypedWord.length + 1 > correctWord.length && addedChar != " ") || // Prevents the caret from going beyond the current word length
      (addedChar == " " && currentTypedWord.length != correctWord.length) // Prevents pressing space in the middle of a word
    ) {
      increaseErrors();
      increaseLettersTyped();
      return;
    }
    // Check if key pressed was correct -> only correct spaces are allowed at this point so any space pressed is correct
    if (addedChar === correctKeyToPress || addedChar === " ") {
      increaseLettersCorrectlyTyped();
    } else {
      increaseErrors();
    }

    // Added one to the total words typed counter
    if (addedChar === " ") {
      setNumWordsTyped((prev) => prev + 1);
      setAllTypedWords((prev) => [...prev, currentTypedWord]);
    }

    // Check if the game has ended (reached the last letter)
    if (
      (mode == gameModes.STANDARD || mode == gameModes.CHALLENGE) &&
      numWordsTyped === numWords - 1 &&
      currentTypedWord.length === correctWord.length - 1 // Need - 1 because all words (including the last word) ends with a space
    ) {
      setAllTypedWords((prev) => [...prev, currentTypedWord]);
      setTypedText(newText);
      setGameCompleted(true);
    }

    // Increase total letters typed
    increaseLettersTyped();
    setTypedText(newText);

    // Shifting the display when the middle line has been fully typed
    const wordsTyped = typedWords.length;

    if (wordsTyped === 2 * WORDS_PER_LINE && addedChar === " ") {
      // 2 lines have been typed and space is pressed
      // Obtain the length of the first visible line
      const firstLineLength = countLetters(visibleLines[0]);

      // Remove the first line from the typed text
      setTypedText(newText.slice(firstLineLength)); // Must use newText since typeText is not fully updated
      setCurrentLineIndex((prev) => prev + 1);
      setWordsTypedOffset(wordsTypedOffset + WORDS_PER_LINE);
    }
    console.log(numWords);
  };

  // Function to restart game
  const restartGame = (mode) => {
    // Reset letters typed counts
    resetLettersCorrectlyTyped();
    resetLettersTyped();
    resetErrors();
    setNumWordsTyped(0);
    setAllTypedWords([]);

    // Reset the displayed words back to the start
    setCurrentLineIndex(0);
    setWordsTypedOffset(0);

    // Reset typed text
    setTypedText("");

    // Reset timers
    setStartedTyping(false);
    resetTimers();

    if (mode === "timed") {
      resetTimer(); // Reset timed timer
    }
  };

  // Function to handle key presses that do not change the input text
  const handleOtherChanges = (e) => {
    currentKeyRef.current = e.key;
    // Escape - reset the typed text
    if (e.key === "Escape") {
      restartGame(mode);
    }
  };

  // Function to handle focus of the input box
  const handleFocus = (e) => {
    setFocus(true);
    const input = inputRef.current;

    // Forces cursor to the end of the input text
    if (input) {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  };

  // Function to handle blur of the input box
  const handleBlur = (e) => {
    const nextFocus = e.relatedTarget;

    // Don't blur if pressing on a button
    if (nextFocus && nextFocus.tagName === "BUTTON") {
      return;
    }
    setFocus(false);

    // Unfocus the input box so you cannot type in it after clicking out
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <>
      <div className="flex justify-center relative">
        {!focus && (
          <div data-testid="blur-box" className="absolute">
            <BlurBox />
          </div>
        )}
        <div className="absolute">
          <DisplayBox
            currentLetter={currentLetter}
            typedWords={typedWords}
            focus={focus}
            currentLineIndex={currentLineIndex}
            WORDS_PER_LINE={WORDS_PER_LINE}
            LINES_ON_SCREEN={LINES_ON_SCREEN}
            visibleLines={visibleLines}
            updateCaretRef={updateCaretRef}
            caretPos={caretPos}
            startedTyping={startedTyping}
          />
        </div>
        <input
          data-testid="typing-input"
          type="text"
          value={typedText}
          onChange={handleTextChange}
          onKeyDown={handleOtherChanges}
          autoFocus
          onFocus={handleFocus}
          onClick={handleFocus}
          onBlur={handleBlur}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          ref={inputRef}
          className="text-start opacity-0 cursor-default w-[1200px] h-[200px] absolute bg-white text-black pb-40 pl-2.5 text-3xl border"
        />
      </div>
    </>
  );
};

export default InputBox;

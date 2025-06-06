"use client";
import { useState, useRef } from "react";
import DisplayBox from "./DisplayBox";
import { wordsData } from "@/lib/words";

const InputBox = () => {
  const [typedText, setTypedText] = useState("");
  const currentKeyRef = useRef(null);
  const currentLetter = typedText.length;

  // Obtain all typed words
  let typedWords = typedText.split(" ");

  // Keep track of what word is currently being typed
  const currentWordIndex = typedWords.length - 1;
  const currentTypedWord = typedWords[currentWordIndex];
  const correctWord = wordsData[currentWordIndex];

  // Function to handle input box text changes
  const handleTextChange = (e) => {
    const newText = e.target.value;
    const keyPressed = currentKeyRef.current; // Current key being pressed

    // Allow backspace to delete letters
    if (keyPressed == "Backspace") {
      setTypedText(newText);
      return;
    }

    // Handle consecutive spacebar presses - don't update typedText
    const addedChar = newText.slice(-1); // Char that was just added
    const lastChar = typedText.slice(-1); // Previous char in the input box

    if (
      (addedChar === " " && lastChar === " ") ||
      (addedChar === " " && !lastChar) || // First character typed should not be a space
      (currentTypedWord.length + 2 > correctWord.length && addedChar != " ") || // Prevents the caret from going beyond the current word length
      (addedChar == " " && currentTypedWord.length + 1 != correctWord.length) // {revents pressing space in the middle of a word
    ) {
      return;
    }
    setTypedText(newText);

    // Obtain all typed words
    typedWords = typedText.split(" ").filter((word) => {
      return word != "";
    });
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

  return (
    <>
      <DisplayBox
        currentLetter={currentLetter}
        typedWords={typedWords}
        wordsData={wordsData}
      />
      <input
        type="text"
        value={typedText}
        onChange={handleTextChange}
        onKeyDown={handleOtherChanges} // This can detect key presses like esc to reset the text
        className="text-start opacity-0 cursor-default mx-75 w-[1000px] h-[200px] mt-40 gap-y-[1.5] gap-x-[0.25em] bg-white absolute text-black pb-40 pl-2.5 text-3xl"
      />
    </>
  );
};

export default InputBox;

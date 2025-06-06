"use client";
import { useState, useRef } from "react";
import DisplayBox from "./DisplayBox";
import { wordsData } from "@/lib/words";
import BlurBox from "./BlurBox";

const InputBox = () => {
  const [typedText, setTypedText] = useState("");
  const [focus, setFocus] = useState(true);
  const currentKeyRef = useRef(null);
  const inputRef = useRef(null);
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

    const addedChar = newText.slice(-1); // Char that was just added
    const lastChar = typedText.slice(-1); // Previous char in the input box

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

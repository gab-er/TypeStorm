"use client";

import { useState, useEffect, useRef } from "react";

const Letter = ({
  letter,
  id,
  typedWord,
  globalIdRef,
  currentLetter,
  focus,
  updateCaretRef,
  displayBoxRef,
}) => {
  // State to show caret
  const [showCaret, setShowCaret] = useState(false);

  // Current letter ref
  const currentLetterRef = useRef();

  // Default color
  let color = "text-primary"; // -> use css defined color 

  // Decide if the caret should be shown
  const globalId = globalIdRef.current; // The current letter's global position
  globalIdRef.current += 1; // Increase the id by 1 for the next letter

  // Check if the input box has been clicked on, and blur if it is not
  const blur = focus ? "" : "blur-xs";

  // Track whether the letter has been typed, and whether it is correct or not
  if (typedWord) {
    if (typedWord[id] === undefined) {
    } else if (typedWord[id] === letter) {
      // Letter typed was correct -> use css defined color 
      color = "text-correct";
    } else {
      // Letter typed was wrong -> use css defined color 
      color = "text-wrong";
    }
  }

  useEffect(() => {
    globalId == currentLetter ? setShowCaret(true) : setShowCaret(false);
  }, [currentLetter]);

  useEffect(() => {
    if (showCaret && currentLetterRef.current) {
      updateCaretRef(currentLetterRef, displayBoxRef);
    }
  }, [showCaret]);

  return (
    <span className={`relative ${blur}`} ref={currentLetterRef}>
      <span
        className={`${color} text-[33px] select-none opacity-95 ${
          letter === " " ? "w-[1ch]" : ""
        }`}
      >
        {/* Give spaces normal character widths */}
        {letter === " " ? "\u00A0" : letter}
      </span>
    </span>
  );
};

export default Letter;

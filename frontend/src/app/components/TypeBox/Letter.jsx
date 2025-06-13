"use client";

import Caret from "./Caret";
import useWordsStore from "@/app/stores/useWordsStore";

let typed = false;

const Letter = ({
  letter,
  id,
  typedWord,
  globalIdRef,
  currentLetter,
  focus,
}) => {
  // Default color
  let color = "text-gray-500";

  // Decide if the caret should be shown
  const globalId = globalIdRef.current; // The letter's global position
  globalIdRef.current += 1; // Increase the id by 1 for the next letter

  const showCaret = globalId === currentLetter;

  // Check if the input box has been clicked on, and blur if it is not
  const blur = focus ? "" : "blur-xs";

  // Track whether the letter has been typed, and whether it is correct or not
  if (typedWord) {
    if (typedWord[id] === undefined) {
    } else if (typedWord[id] === letter) {
      // Letter typed was correct
      color = "text-white";
    } else {
      // Letter typed was wrong
      color = "text-red-400";
    }
  }

  return (
    <span className={`relative ${blur}`}>
      {/* Caret */}
      {showCaret && <Caret />}
      <span className={`${color} text-3xl select-none opacity-80`}>
        {letter}
      </span>
    </span>
  );
};

export default Letter;

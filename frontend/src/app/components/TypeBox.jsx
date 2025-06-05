"use client";
import { wordsData } from "@/lib/words";
import Word from "./Word";
import { useState } from "react";

// The TypeBox contains two things: An invisible input box and a box to display the given words 

const TypeBox = () => {
  const [typedText, setTypedText] = useState("");

  // Function to handle input box text changes
  const handleTextChange = (e) => {
    const text = e.target.value;
    setTypedText(text);
  };

  // Function to handle key presses that do not change the input text 
  const handleOtherChanges = (e) => {
    if (e.key === "Escape") {
      setTypedText("")
      console.log("reset");
    }
  }

  const typedWords = typedText.split(" ");

  return (
    // Given words display
    <div className="relative">
      <div className="absolute flex flex-wrap mx-75 w-[1000px] h-[200px] mt-40 gap-y-[1.5] gap-x-[0.25em]">
        {wordsData.map((word, index) => (
          <Word
            key={index}
            wordId={index}
            word={word}
            typedWord={typedWords[index]}
          />
        ))}
      </div>
      {/* Invisible input box */}
      <input
        value={typedText}
        onChange={handleTextChange}
        onKeyDown={handleOtherChanges} // This can detect key presses like esc to reset the text
        className="opacity-0 cursor-default mx-75 w-[1000px] h-[200px] mt-40 gap-y-[1.5] gap-x-[0.25em] bg-white absolute text-black"
      />
    </div>
  );
};

export default TypeBox;

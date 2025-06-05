"use client";
import { useState } from "react";
import DisplayBox from "./DisplayBox";

const InputBox = () => {
  const [typedText, setTypedText] = useState("");
  const currentLetter = typedText.length;

  // Function to handle input box text changes
  const handleTextChange = (e) => {
    const text = e.target.value;
    setTypedText(text);
  };

  // Function to handle key presses that do not change the input text
  const handleOtherChanges = (e) => {
    if (e.key === "Escape") {
      setTypedText("");
      console.log("reset");
    }
  };

  return (
    <>
      <DisplayBox typedText={typedText} currentLetter={currentLetter} />
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

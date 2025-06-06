import Word from "./Word";
import { useRef } from "react";

const DisplayBox = ({ currentLetter, typedWords, wordsData, focus }) => {
  // Global ID for the caret to keep track of what position to be in
  const globalIdRef = useRef(0);
  globalIdRef.current = 0;

  // Create a Word component from each word
  return (
    <>
      <div className="w-full h-screen flex justify-center">
        <div className="flex justify-left items-center flex-wrap w-[1000px] h-[200px] gap-y-[1.5] gap-x-[0.25em] mx-auto">
          {wordsData.map((word, index) => (
            <Word
              key={index}
              word={word}
              typedWord={typedWords[index]}
              globalIdRef={globalIdRef}
              currentLetter={currentLetter}
              focus={focus}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayBox;

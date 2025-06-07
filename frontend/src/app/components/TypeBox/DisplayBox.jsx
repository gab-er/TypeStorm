import Word from "./Word";
import { useRef, useState } from "react";
import { splitWords } from "@/lib/words";

const DisplayBox = ({
  currentLetter,
  typedWords,
  focus,
  WORDS_PER_LINE,
  visibleLines,
}) => {
  // Global ID for the caret to keep track of what position to be in
  const globalIdRef = useRef(0);
  globalIdRef.current = 0;

  // Create a Word component from each word
  return (
    <>
      {/* original typebox without text shifting */}
      {/* <div className="w-full h-screen flex justify-center">
        <div className="flex justify-left items-center flex-wrap w-[1000px] h-[200px] gap-y-[1.5] gap-x-[0.25em] mx-auto border">
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
      </div> */}
      {/* Lines */}
      <div className="w-[1000px] h-[200px] flex flex-col justify-center">
        {visibleLines.map((line, i) => (
          // Each individual line
          <div key={i} className="flex justify-left h-1/3">
            {line.map((word, index) => (
              <Word
                key={index}
                word={word}
                typedWord={typedWords[index + WORDS_PER_LINE * i]}
                globalIdRef={globalIdRef}
                currentLetter={currentLetter}
                focus={focus}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayBox;

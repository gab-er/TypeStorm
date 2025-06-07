import Word from "./Word";
import { useRef } from "react";

const DisplayBox = ({
  currentLetter,
  typedWords,
  focus,
  WORDS_PER_LINE,
  visibleLines,
  lettersCorrectlyTyped,
  setLettersCorrectlyTyped,
  incrementLettersCorrectlyTyped
}) => {
  // Global ID for the caret to keep track of what position to be in
  const globalIdRef = useRef(0);
  globalIdRef.current = 0;

  // Create a Word component from each word
  return (
    <>
      <div className="w-[1000px] h-[200px] flex flex-col justify-center">
        {visibleLines.map((line, i) => (
          // Each individual line
          <div key={i} className="flex justify-left h-1/3 items-center ">
            {line.map((word, index) => (
              <Word
                key={index}
                word={word}
                typedWord={typedWords[index + WORDS_PER_LINE * i]}
                globalIdRef={globalIdRef}
                currentLetter={currentLetter}
                focus={focus}
                lettersCorrectlyTyped={lettersCorrectlyTyped}
                setLettersCorrectlyTyped={setLettersCorrectlyTyped}
                incrementLettersCorrectlyTyped={incrementLettersCorrectlyTyped}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayBox;

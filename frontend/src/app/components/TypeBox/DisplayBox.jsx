import { wordsData } from "@/lib/words";
import Word from "./Word";
import { useRef } from "react";

const DisplayBox = ({ typedText, currentLetter }) => {
  const typedWords = typedText.split(" ");
  console.log(typedWords);
  const globalIdRef = useRef(0);
  globalIdRef.current = 0;

  // Create a Word component from each word
  return (
    <>
      <div className="relative">
        <div className="absolute flex flex-wrap mx-75 w-[1000px] h-[200px] mt-40 gap-y-[1.5] gap-x-[0.25em]">
          {wordsData.map((word, index) => (
            <Word
              key={index}
              wordId={index}
              word={word}
              typedWord={typedWords[index]}
              globalIdRef={globalIdRef}
              currentLetter={currentLetter}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayBox;

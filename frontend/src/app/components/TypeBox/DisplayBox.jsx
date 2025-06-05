import { wordsData } from "@/lib/words";
import Word from "./Word";

const DisplayBox = ({ typedText }) => {
  const typedWords = typedText.split(" ");
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
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayBox;

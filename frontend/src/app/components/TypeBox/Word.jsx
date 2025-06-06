import Letter from "./Letter";

const Word = ({ word, typedWord, globalIdRef, currentLetter }) => {
  const letters = word.split("");

  // Create a Letter component from each letter
  return (
    <div className="flex ml-2">
      {letters.map((letter, index) => {
        const char = (
          <Letter
            key={index}
            letter={letter}
            id={index}
            typedWord={typedWord}
            globalIdRef={globalIdRef}
            currentLetter={currentLetter}
          />
        );
        return char;
      })}
    </div>
  );
};

export default Word;

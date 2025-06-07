import Letter from "./Letter";

const Word = ({
  word,
  typedWord,
  globalIdRef,
  currentLetter,
  focus,
  lettersCorrectlyTyped,
  setLettersCorrectlyTyped,
  incrementLettersCorrectlyTyped,
}) => {
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
            focus={focus}
            lettersCorrectlyTyped={lettersCorrectlyTyped}
            setLettersCorrectlyTyped={setLettersCorrectlyTyped}
            incrementLettersCorrectlyTyped={incrementLettersCorrectlyTyped}
          />
        );
        return char;
      })}
    </div>
  );
};

export default Word;

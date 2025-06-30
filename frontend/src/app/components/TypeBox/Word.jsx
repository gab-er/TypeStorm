import Letter from "./Letter";

const Word = ({
  word,
  typedWord,
  globalIdRef,
  currentLetter,
  focus,
  updateCaretRef,
  displayBoxRef
}) => {
  // Split the word into an array of letters
  const letters = word.split("");

  // Create a Letter component from each letter
  return (
    <div className="flex">
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
            updateCaretRef={updateCaretRef}
            displayBoxRef={displayBoxRef}
          />
        );
        return char;
      })}
    </div>
  );
};

export default Word;

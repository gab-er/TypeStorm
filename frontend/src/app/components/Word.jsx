import Letter from "./Letter";

const Word = ({ wordId, word, typedWord }) => {

  const letters = word.split("");

  return (
    <div className="flex ml-2">
      {letters.map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          id={index}
          typedWord={typedWord}
          wordId={wordId}
        />
      ))}
    </div>
  );
};

export default Word;

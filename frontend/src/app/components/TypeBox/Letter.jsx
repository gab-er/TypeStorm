import Caret from "./Caret";

const Letter = ({ letter, id, typedWord, globalIdRef, currentLetter }) => {
  // Default color
  let color = "text-white";
  const globalId = globalIdRef.current;
  const showCaret = globalId === currentLetter;

  if (typedWord) {
    if (typedWord[id] === undefined) {
    } else if (typedWord[id] === letter) {
      color = "text-green-500";
    } else {
      color = "text-red-500";
    }
  }

  globalIdRef.current += 1;

  return (
    <span className="relative">
      {/* Caret */}
      {showCaret && <Caret />}
      <span className={`${color} text-3xl select-none opacity-80`}>
        {letter}
      </span>
    </span>
  );
};

export default Letter;

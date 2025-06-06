import Caret from "./Caret";

const Letter = ({
  letter,
  id,
  typedWord,
  globalIdRef,
  currentLetter,
  focus,
}) => {
  // Default color
  let color = "text-gray-500";

  const globalId = globalIdRef.current;
  const showCaret = globalId === currentLetter;
  const blur = focus ? "" : "blur-xs";

  if (typedWord) {
    if (typedWord[id] === undefined) {
    } else if (typedWord[id] === letter) {
      color = "text-white";
    } else {
      color = "text-red-400";
    }
  }

  globalIdRef.current += 1;

  return (
    <span className={`relative ${blur}`}>
      {/* Caret */}
      {showCaret && <Caret />}
      <span className={`${color} text-3xl select-none opacity-80`}>
        {letter}
      </span>
    </span>
  );
};

export default Letter;

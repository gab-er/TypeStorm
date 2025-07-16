import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";

const WordCounter = ({ allTypedWords, numWords }) => {
  const mode = useWordsStore((state) => state.mode);

  return (
    <div className="select-none">
      {/* Show the total words to type in STANDARD mode */}
      {mode == gameModes.STANDARD && (
        <div className="text-2xl text-counter">
          {allTypedWords.length} / {numWords}
        </div>
      )}
      {/* Show only the words typed count in TIMED and PRACTICE mode */}
      {mode != gameModes.STANDARD && (
        <div className="text-2xl text-counter">{allTypedWords.length}</div>
      )}
    </div>
  );
};

export default WordCounter;

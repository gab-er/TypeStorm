import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";

const WordCounter = ({ allTypedWords, numWords }) => {
  const mode = useWordsStore((state) => state.mode);

  return (
    <div>
      {/* Show the total words to type in STANDARD mode */}
      {mode == gameModes.STANDARD && (
        <div className="text-2xl text-indigo-400">
          {allTypedWords.length} / {numWords}
        </div>
      )}
      {/* Show only the words typed count in TIMED and PRACTICE mode */}
      {(mode == gameModes.TIMED || mode == gameModes.PRACTICE) && (
        <div className="text-2xl text-indigo-400">{allTypedWords.length}</div>
      )}
    </div>
  );
};

export default WordCounter;

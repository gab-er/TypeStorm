import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";

const WordCounter = ({ allTypedWords, numWords }) => {
  const mode = useWordsStore((state) => state.mode);

  return (
    <div>
      {mode == gameModes.STANDARD && (
        <div className="text-2xl text-indigo-400">
          {allTypedWords.length} / {numWords}
        </div>
      )}
      {mode == gameModes.TIMED || mode == gameModes.PRACTICE && (
        <div className="text-2xl text-indigo-400">{allTypedWords.length}</div>
      )}
    </div>
  );
};

export default WordCounter;

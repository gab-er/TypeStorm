const WordCounter = ({ allTypedWords, numWords }) => {
  return (
    <div className="text-2xl text-indigo-400">
      {allTypedWords.length} / {numWords}
    </div>
  );
};

export default WordCounter;

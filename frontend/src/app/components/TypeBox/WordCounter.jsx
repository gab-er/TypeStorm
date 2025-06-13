import React from "react";

const WordCounter = ({ allTypedWords, WORDS_TO_TYPE }) => {
  return (
    <div className="text-2xl text-indigo-400">
      {allTypedWords.length} / {WORDS_TO_TYPE}
    </div>
  );
};

export default WordCounter;

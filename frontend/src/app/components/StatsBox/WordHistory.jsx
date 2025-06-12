const WordHistory = ({ allTypedWords, wordsToType }) => {
  // AllTypedWords is an array of the words typed

  // Compare this against the original correct words wordstoType
  // Note the correct words has an extra space at the end
  const allTypedLetters = allTypedWords.join("").split("").flat(); // Array of all letters typed
  const allCorrectLetters = wordsToType.join("").split("").flat(); // Array of all correct letters to type

  return (
    <div className="flex flex-col flex-wrap w-[1000px] items-center text-2xl text-gray-400">
      Word History
      <div>
        {allCorrectLetters.map((letter, index) => {
          let color = "text-white";
          if (allCorrectLetters[index] !== allTypedLetters[index]) {
            color = "text-red-400";
          }
          return (
            <span key={index} className={`${color}`}>
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordHistory;

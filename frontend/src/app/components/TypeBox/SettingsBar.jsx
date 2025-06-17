import WordNumberButton from "./WordNumberButton";

const SettingsBar = ({ setNumWords, inputRef, numWords }) => {
  const changeNumWords = (num) => {
    setNumWords(num);
    // Refocus the input box
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="gap-2 flex items-center rounded-xl text-xl bg-gray-700 pl-2">
      <p> Words: </p>
      <WordNumberButton
        num={10}
        changeNumWords={() => changeNumWords(10)}
        numWords={numWords}
      />
      <WordNumberButton
        num={25}
        changeNumWords={() => changeNumWords(25)}
        numWords={numWords}
      />
      <WordNumberButton
        num={50}
        changeNumWords={() => changeNumWords(50)}
        numWords={numWords}
      />
      <WordNumberButton
        num={75}
        changeNumWords={() => changeNumWords(75)}
        numWords={numWords}
      />
      <WordNumberButton
        num={100}
        changeNumWords={() => changeNumWords(100)}
        numWords={numWords}
      />
    </div>
  );
};

export default SettingsBar;

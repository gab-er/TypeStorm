import WordNumberButton from "./WordNumberButton";
import CustomButton from "./CustomButton";

const StandardSettingsBar = ({
  setNumWords,
  inputRef,
  numWords,
  setFocus,
  focus,
}) => {
  const changeNumWords = (num) => {
    setNumWords(num);
    // Refocus the input box
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    // bg-gray-800
    <div className="select-none gap-2 w-100 flex items-center rounded-xl text-xl pl-2 text-secondary">
      <p> words | </p>
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
      <CustomButton
        setNumWords={setNumWords}
        setFocus={setFocus}
        inputRef={inputRef}
        numWords={numWords}
      />
    </div>
  );
};

export default StandardSettingsBar;

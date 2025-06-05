const Letter = ({ letter, id, typedWord, wordId }) => {

  let color = "text-white";

  if (typedWord) {
    if (typedWord[id] === undefined) {
    } else if (typedWord[id] === letter) {
      color = "text-green-500";
    } else {
      color = "text-red-500";
    }
  }

  return (
    <div className={`${color} text-3xl select-none opacity-80`}>{letter}</div>
  );
};

export default Letter;

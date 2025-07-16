import { Button, IconButton } from "@mui/material";

const WordNumberButton = ({ num, changeNumWords, numWords }) => {
  let selected = "text-secondary";

  if (num === numWords) {
    // The current button chosen will become highlighted
    selected = "text-selected";
  }

  return (
    <div className={`rounded-xl hover:text-hover`}>
      {/* Previously used <IconButton/> */}
      <button
        variant="contained"
        size="medium"
        color="primary"
        onClick={changeNumWords}
      >
        <div className={`text-xl ${selected} hover:text-hover`}> {num} </div>
      </button>
    </div>
  );
};

export default WordNumberButton;

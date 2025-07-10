import { Button, IconButton } from "@mui/material";

const WordNumberButton = ({ num, changeNumWords, numWords }) => {
  let selected = "text-gray-500";

  if (num === numWords) {
    // The current button chosen will become highlighted
    selected = "text-white";
  }

  return (
    <div className={`rounded-xl hover:text-white`}>
      {/* Previously used <IconButton/> */}
      <button
        variant="contained"
        size="medium"
        color="primary"
        onClick={changeNumWords}
      >
        <div className={`text-xl ${selected} hover:text-white`}> {num} </div>
      </button>
    </div>
  );
};

export default WordNumberButton;

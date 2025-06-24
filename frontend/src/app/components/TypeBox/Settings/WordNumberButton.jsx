import { Button, IconButton } from "@mui/material";

const WordNumberButton = ({ num, changeNumWords, numWords }) => {
  let selected = "";

  if (num === numWords) {
    // The current button chosen will become highlighted
    selected = "bg-gray-800";
  }

  return (
    <div className={` ${selected} rounded-xl`}>
      <IconButton
        variant="contained"
        size="medium"
        color="primary"
        onClick={changeNumWords}
      >
        <div className="text-xl text-white"> {num} </div>
      </IconButton>
    </div>
  );
};

export default WordNumberButton;

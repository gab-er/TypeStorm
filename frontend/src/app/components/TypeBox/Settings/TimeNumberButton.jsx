import { Button, IconButton } from "@mui/material";
import useTimedStore from "@/app/stores/useTimedStore";

const TimeNumberButton = ({ num, changeTime }) => {
  const timeLimit = useTimedStore((state) => state.timeLimit);

  let selected = "";

  if (num === timeLimit) {
    // The current button chosen will become highlighted
    selected = "bg-gray-700";
  }

  return (
    <div className={` ${selected} rounded-xl`}>
      <IconButton
        variant="contained"
        size="medium"
        color="primary"
        onClick={changeTime}
      >
        <div className="text-xl text-white"> {num} </div>
      </IconButton>
    </div>
  );
};

export default TimeNumberButton;

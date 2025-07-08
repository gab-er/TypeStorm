import { Button, IconButton } from "@mui/material";
import useTimedStore from "@/app/stores/useTimedStore";

const TimeNumberButton = ({ num, changeTime }) => {
  const timeLimit = useTimedStore((state) => state.timeLimit);

  let selected = "text-gray-500";

  if (num === timeLimit) {
    // The current button chosen will become highlighted
    selected = "text-white";
  }

  return (
    <div className={`rounded-xl`}>
      <button onClick={changeTime}>
        <div className={`${selected} text-xl hover:text-white`}> {num} </div>
      </button>
    </div>
  );
};

export default TimeNumberButton;

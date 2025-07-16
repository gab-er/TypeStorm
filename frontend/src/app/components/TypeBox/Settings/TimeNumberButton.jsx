import { Button, IconButton } from "@mui/material";
import useTimedStore from "@/app/stores/useTimedStore";
import { useState, useEffect } from "react";

const TimeNumberButton = ({ num, changeTime }) => {
  const timeLimit = useTimedStore((state) => state.timeLimit);
  const [color, setColor] = useState("text-secondary");

  useEffect(() => {
    if (num === timeLimit) {
      // The current button chosen will become highlighted
      setColor("text-selected");
    } else {
      setColor("text-secondary");
    }
  }, [timeLimit]);

  return (
    <div className={`rounded-xl`}>
      <button onClick={changeTime}>
        <div className={`${color} text-xl hover:text-hover`}> {num} </div>
      </button>
    </div>
  );
};

export default TimeNumberButton;
